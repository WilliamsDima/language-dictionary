import { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

type Props = {
  active: boolean
  translateOutputRange?: number[] | string[]
}

export const useTooltipAnim = ({
  active,
  translateOutputRange = [50, 0],
}: Props) => {
  const valueTranslate = useRef(new Animated.Value(0))
  const valueOpacity = useRef(new Animated.Value(0))

  const translateRange = valueTranslate.current.interpolate({
    inputRange: [0, 10],
    outputRange: translateOutputRange,
  })

  const opacityRange = valueOpacity.current.interpolate({
    inputRange: [0, 10],
    outputRange: [0, 1],
  })

  const startAnimate = (start: boolean) => {
    Animated.spring(valueTranslate.current, {
      toValue: start ? 10 : 0,
      useNativeDriver: true,
      delay: 0,
    }).start()
    Animated.spring(valueOpacity.current, {
      toValue: start ? 10 : 0,
      useNativeDriver: true,
      delay: 0,
    }).start()
  }

  const getAnimationStyles = () => ({
    transform: [{ translateY: translateRange }],
    opacity: opacityRange,
  })

  useEffect(() => {
    startAnimate(active)
  }, [active])

  return {
    getAnimationStyles,
  }
}
