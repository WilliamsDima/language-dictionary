import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

type Props = {
  active: boolean
  delay?: number
  easing?: any
  outputRange?: number[] | string[]
  duration?: number
}

export const useOpacityAnim = ({
  active,
  delay = 0,
  easing = Easing.bounce,
  outputRange = [0, 1],
  duration = 500,
}: Props) => {
  const valueScale = useRef(new Animated.Value(1))

  const opacityRange = valueScale.current.interpolate({
    inputRange: [0, 10],
    outputRange,
  })

  const startAnimate = (start: boolean) => {
    Animated.timing(valueScale.current, {
      toValue: start ? 10 : 0,
      useNativeDriver: true,
      duration,
      delay,
      easing,
    }).start()
  }

  const getAnimationStylesOpacity = () => ({
    opacity: opacityRange,
  })

  useEffect(() => {
    startAnimate(active)
  }, [active])

  return {
    getAnimationStylesOpacity,
  }
}
