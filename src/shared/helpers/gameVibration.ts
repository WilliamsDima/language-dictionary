import { Vibration } from 'react-native'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { appStorage } from '@/shared/storage/mmkv.storage'

// короткий лёгкий отклик; VIBRATE уже есть в AndroidManifest
const WRONG_ANSWER_VIBRATION_MS = 50

// настройка «Вибрация в играх» этого устройства, по умолчанию включена
export const isGameVibrationEnabled = (): boolean =>
  appStorage.getBoolean(LOCAL_KEYS.gameVibrationEnabled) ?? true

export const setGameVibrationEnabled = (isEnabled: boolean): void => {
  appStorage.setBoolean(LOCAL_KEYS.gameVibrationEnabled, isEnabled)
}

// вибрация при объективно неправильном ответе в игре. Настройка читается из
// MMKV в момент вызова, поэтому компонентам режимов не нужна подписка на неё
export const vibrateOnWrongAnswer = (): void => {
  if (isGameVibrationEnabled()) {
    Vibration.vibrate(WRONG_ANSWER_VIBRATION_MS)
  }
}
