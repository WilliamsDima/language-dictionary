import React, { FC, memo, useEffect, useRef } from 'react'
import { Animated, Easing, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from './ScreenBackground.styles'

const ScreenBackground: FC = () => {
  const floatAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [floatAnim])

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -16],
  })

  return (
    <View pointerEvents="none" style={styles.background}>
      <LinearGradient
        colors={['#08111F', '#0B1628', '#102238', '#0A1422']}
        locations={[0, 0.35, 0.7, 1]}
        style={styles.gradient}
      />
      <Animated.View style={[styles.topGlow, { transform: [{ translateY }] }]} />
      <Animated.View
        style={[styles.sideGlow, { transform: [{ translateY: Animated.multiply(translateY, -0.7) }] }]}
      />
      <View style={styles.bottomGlow} />
      <View style={styles.grid} />
      <View style={styles.vignette} />
    </View>
  )
}

export default memo(ScreenBackground)
