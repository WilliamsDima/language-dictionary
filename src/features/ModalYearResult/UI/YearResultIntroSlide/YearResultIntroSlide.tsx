import React, { type FC, memo, useMemo } from 'react'
import { styles } from './YearResultIntroSlide.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView from 'lottie-react-native'
import UserAvatart from '@/shared/UI/UserAvatart/UserAvatart'

type Props = {
  title: string
  description: string
  avatarUri?: string
}

const YearResultIntroSlide: FC<Props> = ({ title, description, avatarUri }) => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        {title ? <Text style={styles.title}>{title}</Text> : <></>}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <></>
        )}

        <LottieView
          style={styles.welcome}
          source={require('../../../../shared/json/welcome.json')}
          autoPlay
          loop={false}
        />
      </View>

      <Text style={styles.emojiLeft}>🎉</Text>
      <Text style={styles.emojiRight}>🎉</Text>

      <View style={styles.user}>
        <UserAvatart
          uri={avatarUri}
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
        <Text style={styles.year}>{currentYear}</Text>
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

export default memo(YearResultIntroSlide)
