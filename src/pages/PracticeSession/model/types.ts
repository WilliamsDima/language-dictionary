import type { FC } from 'react'
import type { IItem } from '@/entities/Item/model/item'
import type { ShowVariantListVale } from '@/shared/store/slice/userSlice'
import type { AnswersByCard } from '@/shared/helpers/answersStats'

// контракт вопроса режима практики. Движок сессии (usePracticeSession +
// PracticeSession) сам отбирает карточки, ведёт прогресс, копит ответы и
// показывает итог; режим рисует только вопрос по одной карточке и сообщает
// результат через onAnswer. Компонент монтируется заново на каждый шаг
// сессии, поэтому локальное состояние вопроса сбрасывать не нужно
export type PracticeQuestionProps = {
  // текущая карточка — актуальные данные из кэша списка карточек
  card: IItem
  // все карточки под выбранный фильтр; для режимов с isCardPlayable — все
  // карточки выбранных языков любого статуса (источник неправильных вариантов)
  pool: IItem[]
  // что показывать вопросом: слово или перевод (ModalCardsFilter)
  showVariant: ShowVariantListVale | null
  onAnswer: (correct: boolean) => void
}

export type PracticeQuestionComponent = FC<PracticeQuestionProps>

// вопрос сразу по группе карточек (например, «Найди пары»): шаг сессии —
// группа из buildGroups режима, ответ — по каждой карточке группы
export type PracticeGroupQuestionProps = {
  // карточки группы — актуальные данные из кэша списка карточек
  cards: IItem[]
  pool: IItem[]
  showVariant: ShowVariantListVale | null
  // ошибка внутри шага — сообщается сразу, чтобы счётчик ошибок сессии
  // обновлялся во время раунда
  onMistake: () => void
  // шаг пройден: ответ по каждой карточке группы
  onAnswer: (answers: AnswersByCard) => void
}

export type PracticeGroupQuestionComponent = FC<PracticeGroupQuestionProps>

// режим в реестре вопросов (modes/practiceQuestions.ts): по одной карточке
// за шаг или группой. isTimed — во время раунда показываются таймер и
// ошибки, в итоге — время и число ошибок
export type PracticeQuestionEntry =
  | {
      kind: 'card'
      Question: PracticeQuestionComponent
      isTimed?: boolean
      // режим с вариантами ответа из других карточек: фильтр по статусу
      // отбирает только карточки для вопросов, а pool — все карточки выбранных
      // языков; в сессию попадают карточки, для которых есть из чего составить
      // вопрос
      isCardPlayable?: (card: IItem, pool: IItem[]) => boolean
    }
  | {
      kind: 'group'
      Question: PracticeGroupQuestionComponent
      // делит карточки сессии (уже в случайном порядке) на шаги
      buildGroups: (cards: IItem[]) => IItem[][]
      isTimed?: boolean
    }

// время и ошибки сессии для режимов с isTimed
export type PracticeTiming = {
  durationMs: number
  mistakes: number
}
