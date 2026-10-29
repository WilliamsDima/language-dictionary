import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { formatDuration } from '../../model/practiceSession'
import type { PracticeTiming } from '../../model/types'
import { styles } from './PracticeTimingResult.styles'

type Props = {
  timing: PracticeTiming
}

// итог режимов с isTimed: время сессии и число ошибок
const PracticeTimingResult: FC<Props> = ({ timing }) => {
  const { t } = useTranslation()

  const time = useMemo(() => formatDuration(timing.durationMs), [
    timing.durationMs,
  ])

  return (
    <View style={styles.wrapper}>
      <View style={styles.stat}>
        <Text style={styles.value}>{time}</Text>
        <Text style={styles.label}>{t('practiceSession.time')}</Text>
      </View>

      <View style={styles.stat}>
        <Text style={styles.value}>{timing.mistakes}</Text>
        <Text style={styles.label}>{t('practiceSession.mistakes')}</Text>
      </View>
    </View>
  )
}

export default memo(PracticeTimingResult)
