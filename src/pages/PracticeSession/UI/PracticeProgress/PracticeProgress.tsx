import React, { FC, memo, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './PracticeProgress.styles'

type Props = {
  // номер текущего вопроса с нуля
  currentIndex: number
  total: number
  onFinish: () => void
}

// прогресс сессии практики: «3/20», полоска и досрочное «завершить»
const PracticeProgress: FC<Props> = ({ currentIndex, total, onFinish }) => {
  const { t } = useTranslation()

  const fillStyle = useMemo(
    () => [
      styles.fill,
      { width: `${total ? (currentIndex / total) * 100 : 0}%` as const },
    ],
    [currentIndex, total]
  )

  const counter = useMemo(
    () => `${Math.min(currentIndex + 1, total)}/${total}`,
    [currentIndex, total]
  )

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.counter}>
          <Text style={styles.counterText}>{counter}</Text>
        </View>

        <TouchableOpacity onPress={onFinish} activeOpacity={0.7}>
          <Text style={styles.finish}>{t('ui.finish')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.track}>
        <View style={fillStyle} />
      </View>
    </View>
  )
}

export default memo(PracticeProgress)
