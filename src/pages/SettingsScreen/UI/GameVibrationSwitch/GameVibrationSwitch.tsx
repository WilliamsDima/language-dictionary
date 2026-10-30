import React, { FC, useCallback, useState } from 'react'
import NotificationSwitch from '../NotificationSwitch/NotificationSwitch'
import {
  isGameVibrationEnabled,
  setGameVibrationEnabled,
} from '@/shared/helpers/gameVibration'
import { useTranslation } from '@/shared/i18n/types'

// переключатель «Вибрация в играх»: настройка этого устройства, хранится
// локально (на сервере её нет), режимы читают её через vibrateOnWrongAnswer
const GameVibrationSwitch: FC = () => {
  const [isEnabled, setIsEnabled] = useState(isGameVibrationEnabled)

  const { t } = useTranslation()

  const onToggle = useCallback((value: boolean) => {
    setGameVibrationEnabled(value)
    setIsEnabled(value)
  }, [])

  return (
    <NotificationSwitch
      title={t('settingsScreen.game_vibration')}
      description={t('settingsScreen.game_vibration_subtitle')}
      value={isEnabled}
      onValueChange={onToggle}
    />
  )
}

export default GameVibrationSwitch
