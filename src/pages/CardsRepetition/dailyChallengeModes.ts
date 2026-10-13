import type { DailyChallengeKnownMode } from '@/shared/API/services/streak/types'
import type { ShowVariantListVale } from '@/shared/store/slice/userSlice'

// поведение экрана повторения для режима задания дня
export type DailyChallengeModeBehavior = {
  // что показываем первым: word_only — слово, translate_only — перевод
  showVariant: ShowVariantListVale
}

// единственное место сопоставления «режим с бэкенда → поведение экрана»:
// новый режим добавляется одной записью здесь и одним значением в
// DailyChallengeKnownMode
const DAILY_CHALLENGE_MODES: Record<
  DailyChallengeKnownMode,
  DailyChallengeModeBehavior
> = {
  WORD_TO_TRANSLATE: { showVariant: 'word_only' },
  TRANSLATE_TO_WORD: { showVariant: 'translate_only' },
}

const isKnownDailyChallengeMode = (
  mode: string
): mode is DailyChallengeKnownMode => {
  return Object.prototype.hasOwnProperty.call(DAILY_CHALLENGE_MODES, mode)
}

// undefined — режима нет или он незнакомый (старый клиент, новый режим):
// вызывающий код использует локальную настройку показа
export const getDailyChallengeModeBehavior = (
  mode?: string
): DailyChallengeModeBehavior | undefined => {
  if (!mode || !isKnownDailyChallengeMode(mode)) {
    return undefined
  }

  return DAILY_CHALLENGE_MODES[mode]
}
