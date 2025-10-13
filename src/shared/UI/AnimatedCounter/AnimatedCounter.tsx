import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import Text from '../Text/Text'
import { COLORS } from '@/assets/styles/colors'

interface AnimatedCounterProps {
  value: number
  duration?: number
  start?: boolean
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1500,
  start,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (start) {
      animatedValue.setValue(0)
      Animated.timing(animatedValue, {
        toValue: value,
        duration,
        useNativeDriver: false,
      }).start()
    }
  }, [value, start])

  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value))
    })

    return () => animatedValue.removeListener(listener)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{displayValue}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 48, fontWeight: 'bold', color: COLORS.gold },
})
