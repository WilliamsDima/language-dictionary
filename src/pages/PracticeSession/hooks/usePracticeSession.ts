import { useCallback, useEffect, useMemo, useState } from 'react'
import type { IItem } from '@/entities/Item/model/item'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import { useLogMetricEventMutation } from '@/shared/API/services/metrics/MetricsQuery'
import {
  AnswersByCard,
  getAnswersStats,
} from '@/shared/helpers/answersStats'
import {
  buildSessionCards,
  buildSessionSteps,
  getNextQuestionIndex,
} from '../model/practiceSession'
import type { PracticeQuestionEntry, PracticeTiming } from '../model/types'
import { PRACTICE_QUESTIONS } from '../modes/practiceQuestions'
import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'

type SessionState = {
  // шаги сессии: по карточке или группа карточек (buildSessionSteps)
  steps: IItem[][]
  // сколько карточек подходило под фильтр на старте — по нему проверяется
  // minCards режима (позже пул может уменьшиться: смена статуса карточки
  // убирает её из кэша списка с фильтром по статусу)
  poolSize: number
  startedAt: number
}

// движок сессии практики, общий для всех режимов: отбор карточек по
// filterCardsModal (язык, статус, количество), шаги режима, прогресс, ответы,
// ошибки/время (режимы с isTimed) и итог. Ответы живут только в памяти и
// никуда не отправляются — практика не участвует в интервальных повторениях
// задания дня (card_reviews)
export const usePracticeSession = (modeId: PracticeModeId) => {
  const { goBack } = useAppNavigation()

  const { isAuth } = useAppSelector((store) => store.app)
  const { filterCardsModal } = useAppSelector((store) => store.items)

  const [session, setSession] = useState<SessionState | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswersByCard>({})
  const [mistakes, setMistakes] = useState(0)
  const [finishedAt, setFinishedAt] = useState<number | null>(null)

  const queryArgs = useMemo(
    () => ({
      filter: {
        status: filterCardsModal.status,
        filter: {
          languages: filterCardsModal.languages,
        },
      },
      // практика работает по всему набору карточек под фильтр, а не только
      // по первой странице
      all: true,
    }),
    [filterCardsModal.status, filterCardsModal.languages]
  )

  const { data, isError } = useGetItemsQuery(queryArgs, { skip: !isAuth })
  const [logMetricEvent] = useLogMetricEventMutation()

  // вопрос режима из реестра; нет в реестре — режим не готов
  const entry = useMemo<PracticeQuestionEntry | undefined>(
    () => PRACTICE_QUESTIONS[modeId],
    [modeId]
  )

  const pool = useMemo(() => data?.items ?? [], [data?.items])

  const poolById = useMemo(
    () => new Map(pool.map((it) => [it.id, it])),
    [pool]
  )

  // число шагов сессии (для режимов по карточке — число карточек)
  const total = useMemo(() => session?.steps.length ?? 0, [session])

  const poolSize = useMemo(() => session?.poolSize ?? 0, [session])

  const startedAt = useMemo(() => session?.startedAt ?? 0, [session])

  const isLoading = useMemo(() => !session, [session])

  const isFinished = useMemo(
    () => !!total && currentIndex >= total,
    [currentIndex, total]
  )

  const isTimed = useMemo(() => !!entry?.isTimed, [entry?.isTimed])

  // карточки шага из снимка сессии, но с актуальными данными из кэша (правка
  // карточки во время практики сразу видна); если карточка выпала из кэша
  // под фильтр — остаётся снимок
  const currentCards = useMemo(
    () =>
      (session?.steps[currentIndex] ?? []).map(
        (card) => poolById.get(card.id) ?? card
      ),
    [currentIndex, poolById, session]
  )

  // ключ шага — вопрос монтируется заново на каждый шаг
  const stepKey = useMemo(
    () => currentCards.map((it) => it.id).join('-'),
    [currentCards]
  )

  const stats = useMemo(() => getAnswersStats(answers), [answers])

  const timing = useMemo<PracticeTiming | undefined>(
    () =>
      isTimed
        ? {
            durationMs: (finishedAt ?? startedAt) - startedAt,
            mistakes,
          }
        : undefined,
    [finishedAt, isTimed, mistakes, startedAt]
  )

  const createSession = useCallback(
    (items: IItem[]): SessionState => ({
      steps: buildSessionSteps(
        buildSessionCards(items, filterCardsModal.limit),
        entry
      ),
      poolSize: items.length,
      startedAt: Date.now(),
    }),
    [entry, filterCardsModal.limit]
  )

  // ответ по шагу: по каждой карточке шага
  const answerStep = useCallback(
    (stepAnswers: AnswersByCard) => {
      if (currentIndex >= total) return

      setAnswers((prev) => ({ ...prev, ...stepAnswers }))
      setCurrentIndex((prev) => getNextQuestionIndex(prev, currentIndex))

      if (currentIndex + 1 >= total) {
        setFinishedAt((prev) => prev ?? Date.now())
      }
    },
    [currentIndex, total]
  )

  const addMistake = useCallback(() => {
    setMistakes((prev) => prev + 1)
  }, [])

  // новый заход по тем же карточкам фильтра в новом случайном порядке
  const restart = useCallback(() => {
    setSession(createSession(pool))
    setAnswers({})
    setMistakes(0)
    setFinishedAt(null)
    setCurrentIndex(0)
  }, [createSession, pool])

  const finish = useCallback(() => {
    // training_opened двигает метрику trainings_count на бэкенде (достижения
    // «Постоянная практика», «Мастер тренировок»); фоновый запрос, выход не ждёт
    logMetricEvent({ type: 'training_opened' })
    goBack()
  }, [goBack, logMetricEvent])

  // карточки сессии отбираются один раз, когда пришёл список под фильтр;
  // ошибка запроса — пустая сессия (экран покажет «ничего не найдено»)
  useEffect(() => {
    if (session) return

    if (data) {
      setSession(createSession(data.items))
    } else if (isError) {
      setSession({ steps: [], poolSize: 0, startedAt: Date.now() })
    }
  }, [createSession, data, isError, session])

  return {
    questionEntry: entry,
    isLoading,
    isFinished,
    isTimed,
    total,
    poolSize,
    currentIndex,
    currentCards,
    stepKey,
    pool,
    showVariant: filterCardsModal.showVariant,
    stats,
    mistakes,
    startedAt,
    timing,
    answerStep,
    addMistake,
    restart,
    finish,
  }
}
