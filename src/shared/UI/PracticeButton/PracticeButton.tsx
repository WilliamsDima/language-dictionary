import React, { FC, memo } from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from '@/shared/i18n/types'
import Text from '../Text/Text'
import { styles } from './PracticeButton.styles'

type Props = Pick<TouchableOpacityProps, 'onPress'> & {
  activeOpacity?: number
}

const PracticeButton: FC<Props> = ({ onPress, activeOpacity = 0.92 }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  return (
    <TouchableOpacity
      style={styles.touch}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <LinearGradient
        colors={[
          theme.colors.palette.gradient_gold,
          theme.colors.palette.gradient_yellow,
          theme.colors.palette.primery,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Text style={styles.title}>{t('profileScreen.practice_cta')}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default memo(PracticeButton)
