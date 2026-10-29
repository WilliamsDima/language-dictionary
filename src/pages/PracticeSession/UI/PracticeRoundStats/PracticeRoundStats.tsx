import React, { FC, memo, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { formatDuration } from '../../model/practiceSession'
import { styles } from './PracticeRoundStats.styles'

const TICK_MS = 1000

type Props = {
  // начало сессии (Date.now())
  startedAt: number
  mistakes: number
}

// таймер и счётчик ошибок во время раунда (режимы с isTimed)
const PracticeRoundStats: FC<Props> = ({ startedAt, mistakes }) => {
  const [now, setNow] = useState(() => Date.now())
  const { t } = useTranslation()

  const time = useMemo(() => formatDuration(now - startedAt), [now, startedAt])

  const mistakesText = useMemo(
    () => t('practiceSession.round_mistakes', { count: mistakes }),
    [mistakes, t]
  )

  const mistakesStyle = useMemo(
    () => (mistakes ? styles.mistakesText : styles.text),
    [mistakes]
  )

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), TICK_MS)

    return () => clearInterval(timer)
  }, [])

  return (
    <View style={styles.wrapper}>
      <View style={styles.pill}>
        <Text style={styles.text}>{`⏱ ${time}`}</Text>
      </View>

      <View style={styles.pill}>
        <Text style={mistakesStyle}>{mistakesText}</Text>
      </View>
    </View>
  )
}

export default memo(PracticeRoundStats)
