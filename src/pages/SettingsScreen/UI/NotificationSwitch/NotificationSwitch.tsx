import React, { FC, memo, useMemo } from 'react'
import { Switch, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './NotificationSwitch.styles'
import Text from '@/shared/UI/Text/Text'

type Props = {
  title: string
  description: string
  value: boolean
  disabled?: boolean
  onValueChange: (value: boolean) => void
}

// строка настроек: заголовок, пояснение и переключатель. Логику включения
// (разрешения, запрос на сервер, хранение) держат сами переключатели
// (ReminderSwitch, AppUpdateSwitch, GameVibrationSwitch)
const NotificationSwitch: FC<Props> = ({
  title,
  description,
  value,
  disabled,
  onValueChange,
}) => {
  const { theme } = useUnistyles()

  const trackColor = useMemo(
    () => ({
      false: theme.colors.palette.border,
      true: theme.colors.palette.primery,
    }),
    [theme.colors.palette.border, theme.colors.palette.primery]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <Text style={styles.text}>{description}</Text>

        <Switch
          value={value}
          disabled={disabled}
          onValueChange={onValueChange}
          trackColor={trackColor}
          thumbColor={theme.colors.base.white}
        />
      </View>
    </View>
  )
}

export default memo(NotificationSwitch)
