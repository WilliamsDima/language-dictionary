import React, { FC, memo, useEffect, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useStreakStatus } from '@/shared/hooks/useStreakStatus'
import { useStartDailyChallenge } from '@/shared/hooks/useStartDailyChallenge'
import { styles } from './DailyStreakBanner.styles'

type Props = {}

const DailyStreakBanner: FC<Props> = () => {
  const { isAuth } = useAppSelector((store) => store.app)
  const { data, isLoading } = useStreakStatus()
  const startDailyChallenge = useStartDailyChallenge()

  const scale = useSharedValue(1)

  const isHidden = useMemo(
    () => !isAuth || isLoading || !data || data.completed_today,
    [isAuth, isLoading, data]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.12, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 700, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    )
  }, [scale])

  if (isHidden || !data) {
    return <></>
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.8}
        onPress={startDailyChallenge}
      >
        <Animated.View style={animatedStyle}>
          <LottieView
            source={require('../../shared/json/fire.json')}
            autoPlay
            loop
            style={styles.emoji}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default memo(DailyStreakBanner)
