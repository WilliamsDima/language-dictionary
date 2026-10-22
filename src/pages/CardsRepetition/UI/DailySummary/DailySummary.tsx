import React, { FC, memo, useMemo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { I18NKeys, useTranslation } from '@/shared/i18n/types'
import { useCardsRepetition } from '../../CardsContext'
import { styles } from './DailySummary.styles'

// итог задания дня: сколько карточек вспомнил / не вспомнил. Кнопка
// завершения отправляет ответы и закрывает задание (onEnd); пока запросы
// идут — лоадер на кнопке, при ошибке — сообщение и «Повторить»
const DailySummary: FC = () => {
  const { dailyStats, isDailyCompleting, isDailyCompleteError, onEnd } =
    useCardsRepetition()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

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

  const btnText = useMemo(
    () => (isDailyCompleteError ? t('ui.retry') : t('ui.finish')),
    [isDailyCompleteError, t]
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

      {isDailyCompleteError ? (
        <Text style={styles.error}>
          {t('cardsRepetition.summary.complete_error')}
        </Text>
      ) : (
        <></>
      )}

      <Button
        style={styles.btn}
        classes={btnClasses}
        isText={!isDailyCompleting}
        disabled={isDailyCompleting}
        onPress={onEnd}
      >
        {isDailyCompleting ? (
          <ActivityIndicator size={'small'} color={theme.colors.base.black} />
        ) : (
          btnText
        )}
      </Button>
    </View>
  )
}

export default memo(DailySummary)
