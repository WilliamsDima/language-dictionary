import React, { FC, useEffect, useMemo, useRef } from 'react'
import { styles } from './ButtonAdd.styles'
import { Animated, Easing, View, TouchableOpacity } from 'react-native'
import PlusIcon from '@/assets/icons/UI/plus.svg'
import { useActions } from '@/shared/hooks/useActions'
import type { MainButtonSideValue } from '@/shared/store/slice/userSlice'

interface Props {
  side?: MainButtonSideValue
}

const ButtonAdd: FC<Props> = ({ side = 'right' }) => {
  const { setShowAddModal } = useActions()
  const floatAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(0)).current

  const wrapperStyle = useMemo(() => {
    return side === 'left' ? styles.wrapperLeft : styles.wrapperRight
  }, [side])

  const haloStyle = useMemo(() => {
    return side === 'left' ? styles.haloLeft : styles.haloRight
  }, [side])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [floatAnim, pulseAnim])

  const onAdd = () => {
    setShowAddModal(true)
  }

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  })

  const haloScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.18],
  })

  const haloOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.28, 0],
  })

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.halo,
          haloStyle,
          {
            opacity: haloOpacity,
            transform: [{ scale: haloScale }],
          },
        ]}
      />
      <Animated.View style={{ transform: [{ translateY }] }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onAdd}
          activeOpacity={0.9}
        >
          <PlusIcon width={24} height={24} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export default ButtonAdd
