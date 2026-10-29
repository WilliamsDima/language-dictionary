import React, { FC, memo, useMemo } from 'react'
import { Easing, View } from 'react-native'
import Text from '../Text/Text'
import { AnimatedCounter } from '../AnimatedCounter/AnimatedCounter'
import { useTranslation } from '@/shared/i18n/types'
import {
  AnswersStats,
  getSuccessPercent,
} from '@/shared/helpers/answersStats'
import { styles } from './AnswersResult.styles'

// процент успешных ответов «досчитывается» от нуля с замедлением к концу
const PERCENT_DURATION_MS = 1000
const PERCENT_EASING = Easing.out(Easing.cubic)
const PERCENT_SUFFIX = '%'

type Props = {
  stats: AnswersStats
}

// итог сессии повторения: процент успешных ответов и сколько карточек
// вспомнил / не вспомнил — общий для задания дня и режимов практики
const AnswersResult: FC<Props> = ({ stats }) => {
  const { t } = useTranslation()

  const successPercent = useMemo(() => getSuccessPercent(stats), [stats])

  return (
    <View style={styles.wrapper}>
      <View style={styles.success}>
        <AnimatedCounter
          value={successPercent}
          start
          duration={PERCENT_DURATION_MS}
          easing={PERCENT_EASING}
          suffix={PERCENT_SUFFIX}
          textStyle={styles.successValue}
        />
        <Text style={styles.successLabel}>
          {t('cardsRepetition.summary.success')}
        </Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValueKnown}>{stats.known}</Text>
          <Text style={styles.statLabel}>
            {t('cardsRepetition.summary.known')}
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValueUnknown}>{stats.unknown}</Text>
          <Text style={styles.statLabel}>
            {t('cardsRepetition.summary.unknown')}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default memo(AnswersResult)
