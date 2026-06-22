import React, { FC, ReactNode, memo, useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  clamp,
  SensorType,
  useAnimatedReaction,
  useAnimatedSensor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'

type Props = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  interval?: number | 'auto'
  perspective?: number
  rotateFactorX?: number
  rotateFactorY?: number
  translateFactorX?: number
  translateFactorY?: number
  maxRotateX?: number
  maxRotateY?: number
  maxTranslateX?: number
  maxTranslateY?: number
  deadZone?: number
  smoothing?: number
  calibrateOnMount?: boolean
  adjustToInterfaceOrientation?: boolean
}

const GyroView: FC<Props> = ({
  children,
  style,
  disabled = false,
  interval = 'auto',
  perspective = 900,
  rotateFactorX = 18,
  rotateFactorY = 22,
  translateFactorX = 3,
  translateFactorY = 2.4,
  maxRotateX = 7,
  maxRotateY = 8,
  maxTranslateX = 5,
  maxTranslateY = 4,
  deadZone = 0.035,
  smoothing = 0.18,
  calibrateOnMount = true,
  adjustToInterfaceOrientation = false,
}) => {
  const tiltSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval,
    adjustToInterfaceOrientation,
  })
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const basePitch = useSharedValue<number | null>(null)
  const baseRoll = useSharedValue<number | null>(null)

  const smoothingFactor = useMemo(() => {
    return Math.min(Math.max(smoothing, 0.01), 1)
  }, [smoothing])

  useAnimatedReaction(
    () => {
      if (disabled || prefersReducedMotion) {
        return {
          rotateX: 0,
          rotateY: 0,
          translateX: 0,
          translateY: 0,
        }
      }

      const sensorPitch = tiltSensor.sensor.value.pitch
      const sensorRoll = tiltSensor.sensor.value.roll

      if (
        calibrateOnMount &&
        (basePitch.value === null || baseRoll.value === null)
      ) {
        basePitch.value = sensorPitch
        baseRoll.value = sensorRoll

        return {
          rotateX: 0,
          rotateY: 0,
          translateX: 0,
          translateY: 0,
        }
      }

      const normalizedPitch = sensorPitch - (basePitch.value ?? 0)
      const normalizedRoll = sensorRoll - (baseRoll.value ?? 0)
      const safePitch =
        Math.abs(normalizedPitch) < deadZone ? 0 : normalizedPitch
      const safeRoll = Math.abs(normalizedRoll) < deadZone ? 0 : normalizedRoll

      return {
        rotateX: clamp(safeRoll * rotateFactorX, -maxRotateX, maxRotateX),
        rotateY: clamp(safePitch * rotateFactorY, -maxRotateY, maxRotateY),
        translateX: clamp(
          safePitch * translateFactorX,
          -maxTranslateX,
          maxTranslateX
        ),
        translateY: clamp(
          safeRoll * translateFactorY,
          -maxTranslateY,
          maxTranslateY
        ),
      }
    },
    (nextTilt) => {
      rotateX.value =
        rotateX.value * (1 - smoothingFactor) +
        nextTilt.rotateX * smoothingFactor
      rotateY.value =
        rotateY.value * (1 - smoothingFactor) +
        nextTilt.rotateY * smoothingFactor
      translateX.value =
        translateX.value * (1 - smoothingFactor) +
        nextTilt.translateX * smoothingFactor
      translateY.value =
        translateY.value * (1 - smoothingFactor) +
        nextTilt.translateY * smoothingFactor
    },
    [
      adjustToInterfaceOrientation,
      basePitch,
      baseRoll,
      calibrateOnMount,
      deadZone,
      disabled,
      interval,
      maxRotateX,
      maxRotateY,
      maxTranslateX,
      maxTranslateY,
      prefersReducedMotion,
      rotateFactorX,
      rotateFactorY,
      smoothingFactor,
      tiltSensor,
      translateFactorX,
      translateFactorY,
    ]
  )

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  })

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  )
}

export default memo(GyroView)
