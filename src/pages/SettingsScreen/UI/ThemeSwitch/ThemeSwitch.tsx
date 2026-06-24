import React, { FC, useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { UnistylesRuntime, useUnistyles } from 'react-native-unistyles'
import { styles } from './ThemeSwitch.styles'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { setAppTheme, type ThemeApp } from '@/shared/styles/theme'

type ThemeSwitchOptionProps = {
  isActive: boolean
  label: string
  onPress: () => void
}

const ThemeSwitchOption: FC<ThemeSwitchOptionProps> = ({
  isActive,
  label,
  onPress,
}) => {
  const { theme } = useUnistyles()

  const optionStyle = useMemo(() => {
    return isActive
      ? {
          backgroundColor: theme.colors.palette.primery,
          borderColor: theme.colors.palette.success_alpha_38,
          shadowColor: theme.colors.palette.primery,
          shadowOffset: {
            width: theme.size.s0,
            height: theme.size.s2,
          },
          shadowOpacity: theme.opacity.o35,
          shadowRadius: theme.size.s6,
          elevation: theme.size.s4,
        }
      : null
  }, [
    isActive,
    theme.colors.palette.primery,
    theme.colors.palette.success_alpha_38,
    theme.opacity.o35,
    theme.size.s0,
    theme.size.s2,
    theme.size.s4,
    theme.size.s6,
  ])

  const optionTextStyle = useMemo(() => {
    return isActive
      ? {
          color: theme.colors.base.black,
        }
      : null
  }, [isActive, theme.colors.base.black])

  return (
    <TouchableOpacity style={[styles.option, optionStyle]} onPress={onPress}>
      <Text style={[styles.optionText, optionTextStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

const ThemeSwitch: FC = () => {
  const { t } = useTranslation()
  const { rt } = useUnistyles()
  const themeName =
    (rt.themeName as ThemeApp) ||
    (UnistylesRuntime.themeName as ThemeApp) ||
    'dark'

  const onSelectTheme = useCallback(
    (nextTheme: ThemeApp) => {
      if (nextTheme === themeName) {
        return
      }

      setAppTheme(nextTheme)
    },
    [themeName]
  )

  const onSelectLight = useCallback(() => {
    onSelectTheme('light')
  }, [onSelectTheme])

  const onSelectDark = useCallback(() => {
    onSelectTheme('dark')
  }, [onSelectTheme])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settingsScreen.theme')}</Text>

      <View style={styles.switcher}>
        <ThemeSwitchOption
          isActive={themeName === 'light'}
          label={t('settingsScreen.theme_light')}
          onPress={onSelectLight}
        />

        <ThemeSwitchOption
          isActive={themeName === 'dark'}
          label={t('settingsScreen.theme_dark')}
          onPress={onSelectDark}
        />
      </View>
    </View>
  )
}

export default ThemeSwitch
