import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import AnswersResult from '@/shared/UI/AnswersResult/AnswersResult'
import type { AnswersStats } from '@/shared/helpers/answersStats'
import { useTranslation } from '@/shared/i18n/types'
import type { PracticeTiming } from '../../model/types'
import PracticeTimingResult from '../PracticeTimingResult/PracticeTimingResult'
import { styles } from './PracticeSummary.styles'

type Props = {
  stats: AnswersStats
  // время и ошибки — только у режимов с isTimed
  timing?: PracticeTiming
  onAgain: () => void
  onFinish: () => void
}

// итог сессии практики (общий для всех режимов): процент и счётчики ответов,
// «Ещё раз» — новый заход по тем же карточкам, «Завершить» — выход
const PracticeSummary: FC<Props> = ({
  stats,
  timing,
  onAgain,
  onFinish,
}) => {
  const { t } = useTranslation()

  const againClasses = useMemo(() => ({ textBtn: styles.againText }), [])
  const finishClasses = useMemo(() => ({ textBtn: styles.finishText }), [])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('practiceSession.summary_title')}</Text>

      <AnswersResult stats={stats} />

      {timing ? <PracticeTimingResult timing={timing} /> : <></>}

      <View style={styles.btns}>
        <Button
          type="BORDER-TRANSPARENT"
          style={styles.again}
          classes={againClasses}
          onPress={onAgain}
        >
          {t('practiceSession.again')}
        </Button>

        <Button style={styles.finish} classes={finishClasses} onPress={onFinish}>
          {t('ui.finish')}
        </Button>
      </View>
    </View>
  )
}

export default memo(PracticeSummary)
