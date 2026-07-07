import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import Text from '../Text/Text'

interface AnimatedCounterProps {
  value: number
  duration?: number
  start?: boolean
  from?: number
  colorFrom?: string
  colorTo?: string
  mode?: 'count' | 'slide'
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration,
  start,
  from = 0,
  colorFrom,
  colorTo,
  mode = 'count',
}) => {
  const { theme } = useUnistyles()

  const animatedValue = useRef(new Animated.Value(from)).current
  const colorProgress = useRef(new Animated.Value(0)).current
  const slideProgress = useRef(new Animated.Value(0)).current
  const [displayValue, setDisplayValue] = useState(from)

  const hasColorAnimation = !!colorFrom && !!colorTo
  const isSlideMode = mode === 'slide'

  const resolvedDuration = useMemo(
    () => duration ?? (isSlideMode ? 500 : 1500),
    [duration, isSlideMode]
  )

  useEffect(() => {
    if (!start) return

    if (isSlideMode) {
      slideProgress.setValue(0)
      colorProgress.setValue(0)

      Animated.parallel([
        Animated.timing(slideProgress, {
          toValue: 1,
          duration: resolvedDuration,
          useNativeDriver: true,
        }),
        Animated.timing(colorProgress, {
          toValue: hasColorAnimation ? 1 : 0,
          duration: resolvedDuration,
          useNativeDriver: false,
        }),
      ]).start()

      return
    }

    animatedValue.setValue(from)
    colorProgress.setValue(0)

    Animated.timing(animatedValue, {
      toValue: value,
      duration: resolvedDuration,
      useNativeDriver: false,
    }).start()

    if (hasColorAnimation) {
      Animated.timing(colorProgress, {
        toValue: 1,
        duration: resolvedDuration,
        useNativeDriver: false,
      }).start()
    }
  }, [
    value,
    start,
    from,
    hasColorAnimation,
    resolvedDuration,
    animatedValue,
    colorProgress,
    isSlideMode,
    slideProgress,
  ])

  useEffect(() => {
    const listener = animatedValue.addListener(({ value: animatedNumber }) => {
      setDisplayValue(Math.floor(animatedNumber))
    })

    return () => animatedValue.removeListener(listener)
  }, [animatedValue])

  const animatedColor = useMemo(() => {
    if (!hasColorAnimation) return undefined

    return colorProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [colorFrom as string, colorTo as string],
    })
  }, [hasColorAnimation, colorFrom, colorTo, colorProgress])

  const textStyle = useMemo(
    () => (animatedColor ? [styles.text, { color: animatedColor }] : styles.text),
    [animatedColor]
  )

  const oldSlideStyle = useMemo(
    () => ({
      opacity: slideProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
      transform: [
        {
          translateY: slideProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -theme.size.s48],
          }),
        },
      ],
    }),
    [slideProgress, theme.size.s48]
  )

  const newSlideStyle = useMemo(
    () => ({
      opacity: slideProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: slideProgress.interpolate({
            inputRange: [0, 1],
            outputRange: [theme.size.s48, 0],
          }),
        },
      ],
    }),
    [slideProgress, theme.size.s48]
  )

  return (
    <View style={styles.container}>
      {isSlideMode ? (
        <View style={styles.slideContainer}>
          <Animated.View
            pointerEvents="none"
            style={[styles.slideItem, oldSlideStyle]}
          >
            <Animated.Text style={textStyle}>{from}</Animated.Text>
          </Animated.View>

          <Animated.View style={[styles.slideItem, newSlideStyle]}>
            <Animated.Text style={textStyle}>{value}</Animated.Text>
          </Animated.View>
        </View>
      ) : hasColorAnimation ? (
        <Animated.Text style={textStyle}>{displayValue}</Animated.Text>
      ) : (
        <Text style={styles.text}>{displayValue}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: { alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: theme.fontSize.s48, fontWeight: 'bold', color: theme.colors.palette.gold },
  slideContainer: {
    width: theme.size.s120,
    height: theme.size.s60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideItem: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
