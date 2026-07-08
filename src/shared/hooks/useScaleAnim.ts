import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

type Props = {
  active: boolean
  delay?: number
  easing?: any
  outputRange?: number[] | string[]
  duration?: number
}

export const useScaleAnim = ({
  active,
  delay = 0,
  easing = Easing.bounce,
  outputRange = [0, 1.1, 1],
  duration = 500,
}: Props) => {
  const valueScale = useRef(new Animated.Value(1))

  const scaleRange = valueScale.current.interpolate({
    inputRange: [0, 10, 20],
    outputRange,
  })

  const startAnimate = (start: boolean) => {
    Animated.timing(valueScale.current, {
      toValue: start ? 20 : 0,
      useNativeDriver: true,
      duration,
      delay,
      easing,
    }).start()
  }

  const getAnimationStyles = () => ({
    transform: [{ scale: scaleRange }],
  })

  useEffect(() => {
    startAnimate(active)
    // startAnimate is recreated every render (not memoized); including it here
    // would re-trigger the animation on every re-render instead of only when
    // `active` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return {
    getAnimationStyles,
  }
}
