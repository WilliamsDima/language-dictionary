import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Text from '@/shared/UI/Text/Text'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { styles } from './AchievementCard.styles'

type Props = {
  title: string
  description: string
  icon: string
  colorFrom: string
  colorTo: string
  unlocked: boolean
  unlockedAt: string | null
  progressCurrent: number
  progressPercent: number
  threshold: number
}

const AchievementCard: FC<Props> = ({
  title,
  description,
  icon,
  colorFrom,
  colorTo,
  unlocked,
  unlockedAt,
  progressCurrent,
  progressPercent,
  threshold,
}) => {
  styles.useVariants({ unlocked })

  const gradientColors = useMemo(
    (): [string, string] => [colorFrom, colorTo],
    [colorFrom, colorTo]
  )

  const gradientStart = useMemo(() => ({ x: 0, y: 0 }), [])
  const gradientEnd = useMemo(() => ({ x: 1, y: 1 }), [])

  const progressFillStyle = useMemo(
    () => [styles.progressFill, { width: `${progressPercent}%` as const }],
    [progressPercent]
  )

  const unlockedDateText = useMemo(() => {
    const formatted = dateFormat({ date: unlockedAt ?? undefined, type: 'FULL' })
    return formatted ? `Открыто ${formatted}` : 'Открыто'
  }, [unlockedAt])

  const progressText = useMemo(
    () => `${progressCurrent}/${threshold}`,
    [progressCurrent, threshold]
  )

  return (
    <LinearGradient
      colors={gradientColors}
      start={gradientStart}
      end={gradientEnd}
      style={styles.card}
    >
      {unlocked ? <></> : <View style={styles.lockedOverlay} />}

      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>

        {unlocked ? (
          <></>
        ) : (
          <View style={styles.lockBadge}>
            <Text style={styles.lockBadgeText}>🔒 Заблокировано</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>

      {unlocked ? (
        <Text style={styles.unlockedText}>{unlockedDateText}</Text>
      ) : (
        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={progressFillStyle} />
          </View>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      )}
    </LinearGradient>
  )
}

export default memo(AchievementCard)
