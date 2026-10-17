import React, { FC, memo, useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { styles } from './StreakFreezeCounter.styles'

type Props = {
  available: number
  max: number
  onPress: () => void
}

const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 }

// счётчик заморозок ❄️ N/3 на плитке серии; тап открывает объяснение
const StreakFreezeCounter: FC<Props> = ({ available, max, onPress }) => {
  const valueText = useMemo(() => `${available}/${max}`, [available, max])

  return (
    <TouchableOpacity
      style={styles.chip}
      activeOpacity={0.7}
      hitSlop={HIT_SLOP}
      onPress={onPress}
    >
      <Text style={styles.icon}>❄️</Text>
      <Text style={styles.text}>{valueText}</Text>
    </TouchableOpacity>
  )
}

export default memo(StreakFreezeCounter)
