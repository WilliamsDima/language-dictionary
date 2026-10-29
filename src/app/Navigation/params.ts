import { RoutesNames } from './RoutesNames'
import type { DailyChallengeCardDTO } from '@/shared/API/services/streak/types'
import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'

export type StartStackParams = {
  [RoutesNames.auth]: undefined
  [RoutesNames.splash]: undefined
}

// экран задания дня: вход из баннера серии / кнопки «Практиковаться» с уже
// готовым набором карточек; challengeMode — режим показа задания дня из
// ответа бэкенда (может отсутствовать). Свободная практика — practiceSession
export type CardsRepetitionParams = {
  mode: 'daily'
  cards: DailyChallengeCardDTO[]
  challengeMode?: string
}

// сессия режима практики; карточки отбираются по filterCardsModal, который
// выставляет ModalCardsFilter перед стартом
export type PracticeSessionParams = {
  modeId: PracticeModeId
}

export type MainStackParams = {
  [RoutesNames.splash]: undefined
  [RoutesNames.main]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type PracticeStackParams = {
  [RoutesNames.practice]: undefined
  [RoutesNames.practiceSession]: PracticeSessionParams
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type SettingsStackParams = {
  [RoutesNames.settings]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type ProfileStackParams = {
  [RoutesNames.profile]: undefined
  [RoutesNames.achievements]: undefined
  [RoutesNames.cardsRepetition]: CardsRepetitionParams
}

export type TabParamsList = {
  [RoutesNames.mainStack]: undefined
  [RoutesNames.practiceStack]: undefined
  [RoutesNames.settingsStack]: undefined
  [RoutesNames.profileStack]: undefined
}

export type AppRouteParams = StartStackParams &
  MainStackParams &
  PracticeStackParams &
  SettingsStackParams &
  ProfileStackParams &
  TabParamsList & {
    [RoutesNames.start]: undefined
  }

export type RootStackParams = {
  [RoutesNames.start]: undefined
}
