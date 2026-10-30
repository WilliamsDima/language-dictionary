import React, { FC, useMemo } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { RouteProp, useRoute } from '@react-navigation/native'
import type { AppRouteParams } from '@/app/Navigation/params'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import Layout from '@/shared/UI/Layout/Layout'
import { useHiddenTabBar } from '@/shared/hooks/useHiddenTabBar'
import { useTranslation } from '@/shared/i18n/types'
import ModalAddItem from '@/features/ModalAddItem/ModalAddItem'
import {
  getPracticeMode,
  hasEnoughCardsForMode,
} from '@/entities/PracticeMode/model/practiceMode'
import { usePracticeSession } from './hooks/usePracticeSession'
import PracticeProgress from './UI/PracticeProgress/PracticeProgress'
import PracticeSummary from './UI/PracticeSummary/PracticeSummary'
import PracticeMessage from './UI/PracticeMessage/PracticeMessage'
import PracticeStep from './UI/PracticeStep/PracticeStep'
import PracticeRoundStats from './UI/PracticeRoundStats/PracticeRoundStats'
import { styles } from './PracticeSession.styles'

type PracticeSessionRoute = RouteProp<
  AppRouteParams,
  typeof RoutesNames.practiceSession
>

type SessionView =
  | 'loading'
  | 'empty'
  | 'not_enough'
  | 'no_playable'
  | 'question'
  | 'summary'

// экран сессии практики: движок (usePracticeSession) + вопрос выбранного
// режима из PRACTICE_QUESTIONS. Задание дня сюда не относится — это
// отдельный экран CardsRepetition с интервальными повторениями
const PracticeSession: FC = () => {
  const route = useRoute<PracticeSessionRoute>()
  const { theme, rt } = useUnistyles()
  const {
    questionEntry,
    isLoading,
    isFinished,
    isTimed,
    hasNoPlayableCards,
    total,
    poolSize,
    currentIndex,
    currentCards,
    stepKey,
    pool,
    showVariant,
    stats,
    mistakes,
    startedAt,
    timing,
    answerStep,
    addMistake,
    restart,
    finish,
  } = usePracticeSession(route.params.modeId)
  const { t } = useTranslation()
  useHiddenTabBar()

  const mode = useMemo(
    () => getPracticeMode(route.params.modeId),
    [route.params.modeId]
  )

  const view = useMemo<SessionView>(() => {
    if (isLoading) return 'loading'
    if (hasNoPlayableCards) return 'no_playable'
    if (!mode || !questionEntry || !total) return 'empty'
    if (!hasEnoughCardsForMode(mode, poolSize)) return 'not_enough'
    if (isFinished) return 'summary'
    return 'question'
  }, [
    hasNoPlayableCards,
    questionEntry,
    isFinished,
    isLoading,
    mode,
    poolSize,
    total,
  ])

  const notEnoughText = useMemo(
    () =>
      t('practiceSession.not_enough_cards', {
        count: mode?.minCards ?? 0,
        available: poolSize,
      }),
    [mode?.minCards, poolSize, t]
  )

  const noPlayableText = useMemo(
    () =>
      t('practiceSession.no_playable_cards', { count: mode?.minCards ?? 0 }),
    [mode?.minCards, t]
  )

  const barStyle = useMemo(
    () => (rt.themeName === 'dark' ? 'light-content' : 'dark-content'),
    [rt.themeName]
  )

  return (
    <Layout isSafeArea>
      <StatusBar
        backgroundColor={theme.colors.background.screen}
        translucent
        barStyle={barStyle}
      />

      <View style={styles.container}>
        {view === 'loading' ? (
          <ActivityIndicator
            style={styles.loader}
            size={'large'}
            color={theme.colors.palette.primery}
          />
        ) : (
          <></>
        )}

        {view === 'empty' ? (
          <PracticeMessage
            text={t('cardsRepetition.empty_filter')}
            onBack={finish}
          />
        ) : (
          <></>
        )}

        {view === 'not_enough' ? (
          <PracticeMessage text={notEnoughText} onBack={finish} />
        ) : (
          <></>
        )}

        {view === 'no_playable' ? (
          <PracticeMessage text={noPlayableText} onBack={finish} />
        ) : (
          <></>
        )}

        {view === 'summary' ? (
          <PracticeSummary
            stats={stats}
            timing={timing}
            onAgain={restart}
            onFinish={finish}
          />
        ) : (
          <></>
        )}

        {view === 'question' && questionEntry ? (
          <>
            <PracticeProgress
              currentIndex={currentIndex}
              total={total}
              onFinish={finish}
            />

            {isTimed ? (
              <PracticeRoundStats startedAt={startedAt} mistakes={mistakes} />
            ) : (
              <></>
            )}

            <PracticeStep
              key={stepKey}
              entry={questionEntry}
              cards={currentCards}
              pool={pool}
              showVariant={showVariant}
              onAnswer={answerStep}
              onMistake={addMistake}
            />
          </>
        ) : (
          <></>
        )}
      </View>

      <ModalAddItem />
    </Layout>
  )
}

export default PracticeSession
