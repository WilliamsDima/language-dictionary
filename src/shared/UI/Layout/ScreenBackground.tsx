import React, { FC, memo, useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, View, useWindowDimensions } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from './ScreenBackground.styles'

const ScreenBackground: FC = () => {
  const { theme, rt } = useUnistyles()
  const { width, height } = useWindowDimensions()
  const topGlowX = useRef(new Animated.Value(0)).current
  const topGlowY = useRef(new Animated.Value(0)).current
  const sideGlowX = useRef(new Animated.Value(0)).current
  const sideGlowY = useRef(new Animated.Value(0)).current
  const bottomGlowX = useRef(new Animated.Value(0)).current
  const bottomGlowY = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(0)).current
  const glowLoopRef = useRef<Animated.CompositeAnimation | null>(null)
  const pulseLoopRef = useRef<Animated.CompositeAnimation | null>(null)

  const topGlowRange = useMemo(() => {
    return {
      x: Math.max(width - theme.size.s260, 0),
      y: Math.max(height - theme.size.s260, 0),
    }
  }, [height, theme.size.s260, width])

  const sideGlowRange = useMemo(() => {
    return {
      x: Math.max(width - theme.size.s220, 0),
      y: Math.max(height - theme.size.s220, 0),
    }
  }, [height, theme.size.s220, width])

  useEffect(() => {
    glowLoopRef.current?.stop()

    topGlowX.setValue(0.82)
    topGlowY.setValue(0.08)
    sideGlowX.setValue(0.06)
    sideGlowY.setValue(0.36)
    bottomGlowX.setValue(0.7)
    bottomGlowY.setValue(0.78)

    glowLoopRef.current = Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(topGlowX, {
            toValue: 0.12,
            duration: 16000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(topGlowX, {
            toValue: 0.88,
            duration: 18000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(topGlowY, {
            toValue: 0.64,
            duration: 15000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(topGlowY, {
            toValue: 0.04,
            duration: 17000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sideGlowX, {
            toValue: 0.74,
            duration: 17000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sideGlowX, {
            toValue: 0.02,
            duration: 15000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sideGlowY, {
            toValue: 0.08,
            duration: 14500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(sideGlowY, {
            toValue: 0.82,
            duration: 18500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bottomGlowX, {
            toValue: 0.1,
            duration: 17500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bottomGlowX, {
            toValue: 0.84,
            duration: 16500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bottomGlowY, {
            toValue: 0.18,
            duration: 15500,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(bottomGlowY, {
            toValue: 0.9,
            duration: 18000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ),
    ])

    glowLoopRef.current.start()

    return () => {
      glowLoopRef.current?.stop()
    }
  }, [bottomGlowX, bottomGlowY, sideGlowX, sideGlowY, topGlowX, topGlowY])

  useEffect(() => {
    pulseLoopRef.current?.stop()
    pulseLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 4200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 4200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    pulseLoopRef.current.start()

    return () => {
      pulseLoopRef.current?.stop()
    }
  }, [pulseAnim])

  const topGlowStyle = useMemo(() => {
    return {
      opacity: pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.55, 0.88],
      }),
      transform: [
        {
          translateX: topGlowX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, topGlowRange.x],
          }),
        },
        {
          translateY: topGlowY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, topGlowRange.y],
          }),
        },
        {
          scale: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.94, 1.08],
          }),
        },
      ],
    }
  }, [pulseAnim, topGlowRange.x, topGlowRange.y, topGlowX, topGlowY])

  const sideGlowStyle = useMemo(() => {
    return {
      opacity: pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0.72],
      }),
      transform: [
        {
          translateX: sideGlowX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, sideGlowRange.x],
          }),
        },
        {
          translateY: sideGlowY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, sideGlowRange.y],
          }),
        },
        {
          scale: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1.12],
          }),
        },
      ],
    }
  }, [pulseAnim, sideGlowRange.x, sideGlowRange.y, sideGlowX, sideGlowY])

  const bottomGlowStyle = useMemo(() => {
    return {
      opacity: pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.45, 0.75],
      }),
      transform: [
        {
          translateX: bottomGlowX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, topGlowRange.x],
          }),
        },
        {
          translateY: bottomGlowY.interpolate({
            inputRange: [0, 1],
            outputRange: [0, topGlowRange.y],
          }),
        },
        {
          scale: pulseAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.96, 1.06],
          }),
        },
      ],
    }
  }, [bottomGlowX, bottomGlowY, pulseAnim, topGlowRange.x, topGlowRange.y])

  const gradientColors = useMemo(() => {
    if (rt.themeName === 'dark') {
      return [
        theme.colors.palette.gray_bg,
        theme.colors.palette.blue_navy_soft,
        theme.colors.palette.item,
        theme.colors.palette.blue_navy,
      ]
    }

    return [
      theme.colors.background.screen,
      theme.colors.palette.blue_navy_soft,
      theme.colors.background.surface,
      theme.colors.palette.blue_navy,
    ]
  }, [
    rt.themeName,
    theme.colors.background.screen,
    theme.colors.background.surface,
    theme.colors.palette.blue_navy,
    theme.colors.palette.blue_navy_soft,
    theme.colors.palette.gray_bg,
    theme.colors.palette.item,
  ])

  return (
    <View pointerEvents="none" style={styles.background}>
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.35, 0.7, 1]}
        style={styles.gradient}
      />
      <Animated.View style={[styles.topGlow, topGlowStyle]} />
      <Animated.View style={[styles.sideGlow, sideGlowStyle]} />
      <Animated.View style={[styles.bottomGlow, bottomGlowStyle]} />
      <View style={styles.grid} />
      <View style={styles.vignette} />
    </View>
  )
}

export default memo(ScreenBackground)
