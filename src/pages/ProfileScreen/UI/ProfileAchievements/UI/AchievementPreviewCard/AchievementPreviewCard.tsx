import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import { styles } from './AchievementPreviewCard.styles'
import { useTranslation } from '@/shared/i18n/types'
import { translateAchievementTitle } from '@/shared/helpers/achievementText'

type Props = {
  title: string
  icon: string
  colorFrom: string
  colorTo: string
  unlocked: boolean
  progressPercent: number
}

const AchievementPreviewCard: FC<Props> = ({
  title,
  icon,
  colorFrom,
  colorTo,
  unlocked,
  progressPercent,
}) => {
  const { t } = useTranslation()

  styles.useVariants({ unlocked })

  const titleText = useMemo(
    () => translateAchievementTitle(t, title),
    [t, title]
  )

  const gradientColors = useMemo(
    (): [string, string] => [colorFrom, colorTo],
    [colorFrom, colorTo]
  )

  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), [])
  const gradientEnd = useMemo(() => ({ x: 1, y: 1 }), [])

  const badgeText = useMemo(
    () =>
      unlocked ? t('achievementsScreen.unlocked_badge') : `${progressPercent}%`,
    [t, unlocked, progressPercent]
  )

  return (
    <LinearGradient
      colors={gradientColors}
      start={gradientStart}
      end={gradientEnd}
      style={styles.card}
    >
      {unlocked ? <></> : <View style={styles.lockedOverlay} />}

      <Text style={styles.icon}>{icon}</Text>

      <View style={styles.footer}>
        <Text style={styles.title} numberOfLines={2}>
          {titleText}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
      </View>
    </LinearGradient>
  )
}

export default memo(AchievementPreviewCard)
