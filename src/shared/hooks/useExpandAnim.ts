import { useState, useRef } from 'react'
import { Easing, Animated, LayoutAnimation } from 'react-native'

export const toggleAnimation = {
  duration: 300,
  update: {
    duration: 300,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}

export const useExpandAnim = () => {
  const animatedController = useRef(new Animated.Value(0)).current

  const [hidden, setHidden] = useState(true)

  const toggle = () => {
    const config = {
      duration: 300,
      toValue: hidden ? 0 : 1,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }

    Animated.timing(animatedController, config).start()
    LayoutAnimation.configureNext(toggleAnimation)
    setHidden((prev) => !prev)
  }

  return { toggle, hidden }
}
