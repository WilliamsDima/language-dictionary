import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { I18NKeys, useTranslation } from '@/shared/i18n/types'
import { useCardsRepetition } from '../../CardsContext'
import { styles } from './DailySummary.styles'

// итог задания дня: сколько карточек вспомнил / не вспомнил. Кнопка
// завершения отправляет ответы и закрывает задание (onEnd)
const DailySummary: FC = () => {
  const { dailyStats, onEnd } = useCardsRepetition()
  const { t } = useTranslation()

  // «не помню» откатывает карточку в первую коробку — она вернётся завтра
  const hint = useMemo(
    () =>
      dailyStats.unknown
        ? t('cardsRepetition.summary.repeat_tomorrow' as I18NKeys, {
            count: dailyStats.unknown,
          })
        : t('cardsRepetition.summary.all_known'),
    [dailyStats.unknown, t]
  )

  const btnClasses = useMemo(() => ({ textBtn: styles.textBtn }), [])

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('cardsRepetition.summary.title')}</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValueKnown}>{dailyStats.known}</Text>
          <Text style={styles.statLabel}>
            {t('cardsRepetition.summary.known')}
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValueUnknown}>{dailyStats.unknown}</Text>
          <Text style={styles.statLabel}>
            {t('cardsRepetition.summary.unknown')}
          </Text>
        </View>
      </View>

      <Text style={styles.hint}>{hint}</Text>

      <Button style={styles.btn} classes={btnClasses} onPress={onEnd}>
        {t('ui.finish')}
      </Button>
    </View>
  )
}

export default memo(DailySummary)
