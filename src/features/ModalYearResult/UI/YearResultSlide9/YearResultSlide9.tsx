import React, { type FC, memo } from 'react'
import { styles } from './YearResultSlide9.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView from 'lottie-react-native'
import type { PropsSlideYearResult } from '../../data'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'

type Props = {} & PropsSlideYearResult

const YearResultSlide9: FC<Props> = ({ index, currentSlide }) => {
  const { setShowYearResult } = useActions()
  const date = new Date()

  const onEnd = () => {
    setShowYearResult(false)
    setAsyncLocal(`${LOCAL_KEYS.watchYearResult}-${date.getFullYear()}`, true)
  }

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <Text style={styles.title}>🌟 Это был твой год в языке.</Text>
        <Text style={styles.title}>Ты растёшь, учишься и не сдаёшься.</Text>
        <Text style={styles.title}>
          В {date.getFullYear() + 1} будет ещё больше достижений! 🚀
        </Text>
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
          onPress={onEnd}
          isText
          classes={{ btn: styles.btn, textBtn: styles.textBtn }}
        >
          завершить
        </Button>
      </View>
    </View>
  )
}

export default memo(YearResultSlide9)
