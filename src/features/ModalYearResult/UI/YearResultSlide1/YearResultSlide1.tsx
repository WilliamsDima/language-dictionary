import React, { type FC, memo } from 'react'
import { styles } from './YearResultSlide1.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView from 'lottie-react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import UserAvatart from '@/shared/UI/UserAvatart/UserAvatart'
import type { PropsSlideYearResult } from '../../data'
import { useTranslation } from '@/shared/i18n/types'

type Props = {} & PropsSlideYearResult

const YearResultSlide1: FC<Props> = ({}) => {
  const { t } = useTranslation()

  const { firebaseData } = useAppSelector((store) => store.user)

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        <Text style={styles.title}>{t('yearsResult.your')}</Text>
        <Text style={styles.title}>{t('yearsResult.language_year')}</Text>

        <LottieView
          style={styles.welcome}
          source={require('../../../../shared/json/welcome.json')}
          autoPlay
          loop={false}
        />
      </View>

      <Text
        style={{
          position: 'absolute',
          left: 30,
          top: 50,
          opacity: 1,
          transform: [{ rotate: `${-100}deg` }],
          fontSize: 40,
        }}
      >
        🎉
      </Text>
      <Text
        style={{
          position: 'absolute',
          right: 30,
          top: 50,
          opacity: 1,
          transform: [{ rotate: `${10}deg` }],
          fontSize: 40,
        }}
      >
        🎉
      </Text>

      <View style={styles.user}>
        <UserAvatart
          uri={firebaseData?.image}
          classes={{ wrapper: styles.imageWrapper, image: styles.image }}
        />

        <View style={styles.fireworksWrapper}>
          <LottieView
            style={styles.fireworks}
            source={require('../../../../shared/json/fireworks.json')}
            autoPlay
            loop
          />
        </View>
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.scrollLeft}
          source={require('../../../../shared/json/scroll-down.json')}
          autoPlay
          loop
        />
        <LottieView
          style={styles.years}
          source={require('../../../../shared/json/2025.json')}
          autoPlay
          loop={false}
        />
        <LottieView
          style={styles.scrollRight}
          source={require('../../../../shared/json/scroll-down.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default memo(YearResultSlide1)
