import React, { type FC, memo, useCallback, useMemo } from 'react'
import { styles } from './YearResultOutroSlide.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView from 'lottie-react-native'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  title: string
  description: string
}

const YearResultOutroSlide: FC<Props> = ({ title, description }) => {
  const { setShowYearResult } = useActions()
  const { t } = useTranslation()

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  // просмотр итогов года владеет своим завершением сам: прячет модалку и
  // взводит флаг watchYearResult-{year}, который гейт на профиле использует,
  // чтобы не показывать модалку автоматически повторно в этом же окне
  const onFinish = useCallback(() => {
    setShowYearResult(false)
    setAsyncLocal(`${LOCAL_KEYS.watchYearResult}-${currentYear}`, true)
  }, [setShowYearResult, currentYear])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        {!!title ? <Text style={styles.title}>{title}</Text> : <></>}
        {!!description ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../shared/json/heart.json')}
          autoPlay
          loop
        />
        <LottieView
          style={styles.confetti}
          source={require('../../../../shared/json/confetti.json')}
          autoPlay
          loop
        />
      </View>

      <View style={styles.btnWrapper}>
        <Button
          onPress={onFinish}
          isText
          classes={{ btn: styles.btn, textBtn: styles.textBtn }}
        >
          {t('ui.finish')}
        </Button>
      </View>
    </View>
  )
}

export default memo(YearResultOutroSlide)
