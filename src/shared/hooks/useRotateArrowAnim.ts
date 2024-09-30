import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

export const useRotateArrowAnim = (active: boolean) => {
  const valueRotate = useRef(new Animated.Value(0))

  const rotateRange = valueRotate.current.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '-90deg'],
  })

  const startAnimate = (start: boolean) => {
    Animated.timing(valueRotate.current, {
      toValue: start ? 20 : 0,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.ease,
    }).start()
  }

  const getAnimationStyles = () => ({
    transform: [{ rotate: rotateRange }],
  })

  useEffect(() => {
    startAnimate(active)
  }, [active])

  return {
    getAnimationStyles,
  }
}
