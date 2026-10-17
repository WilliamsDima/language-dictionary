import React, { FC, memo, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { styles } from './FrozenStreakHero.styles'

type Props = {
  value: number
  // запуск анимации «заморозки» — после того как модалка проявилась
  start: boolean
}

const FREEZE_DURATION_MS = 900
const FREEZE_EASING = Easing.out(Easing.cubic)
const SNOWFLAKE_TURN_MS = 12000
const SHIMMER_PAUSE_MS = 1400
const SHIMMER_DURATION_MS = 900

// блик проходит по льдинке слева направо, выходя за её края
const SHIMMER_FROM_X = -60
const SHIMMER_TO_X = 320

const GRADIENT_START = { x: 0, y: 0 }
const GRADIENT_END = { x: 1, y: 1 }

// «ледяная» цифра серии: число сначала тёплое (цвет серии), затем
// покрывается льдинкой — цвет уходит в голубой, льдинка проявляется и
// «садится» на место, по ней периодически пробегает блик; над числом
// медленно вращается снежинка
const FrozenStreakHero: FC<Props> = ({ value, start }) => {
  const { theme } = useUnistyles()

  const freeze = useSharedValue(0)
  const shimmer = useSharedValue(0)
  const turn = useSharedValue(0)

  const iceColors = useMemo(
    () => [theme.colors.streak.frozenGlow, theme.colors.palette.white_alpha_06],
    [theme]
  )

  const colorFrom = useMemo(() => theme.colors.streak.bright, [theme])
  const colorTo = useMemo(() => theme.colors.streak.frozen, [theme])

  const numberAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(freeze.value, [0, 1], [colorFrom, colorTo]),
  }))

  const iceAnimatedStyle = useAnimatedStyle(() => ({
    opacity: freeze.value,
    transform: [{ scale: interpolate(freeze.value, [0, 1], [1.25, 1]) }],
  }))

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shimmer.value,
          [0, 1],
          [SHIMMER_FROM_X, SHIMMER_TO_X]
        ),
      },
      { rotate: '20deg' },
    ],
  }))

  const snowflakeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${turn.value}deg` }],
  }))

  const numberStyle = useMemo(
    () => [styles.number, numberAnimatedStyle],
    [numberAnimatedStyle]
  )

  const iceStyle = useMemo(
    () => [styles.ice, iceAnimatedStyle],
    [iceAnimatedStyle]
  )

  const shimmerStyle = useMemo(
    () => [styles.shimmer, shimmerAnimatedStyle],
    [shimmerAnimatedStyle]
  )

  const snowflakeStyle = useMemo(
    () => [styles.snowflake, snowflakeAnimatedStyle],
    [snowflakeAnimatedStyle]
  )

  useEffect(() => {
    turn.value = 0
    turn.value = withRepeat(
      withTiming(360, { duration: SNOWFLAKE_TURN_MS, easing: Easing.linear }),
      -1,
      false
    )

    return () => cancelAnimation(turn)
  }, [turn])

  useEffect(() => {
    cancelAnimation(freeze)
    cancelAnimation(shimmer)
    freeze.value = 0
    shimmer.value = 0

    if (!start) return

    freeze.value = withTiming(1, {
      duration: FREEZE_DURATION_MS,
      easing: FREEZE_EASING,
    })
    shimmer.value = withDelay(
      FREEZE_DURATION_MS,
      withRepeat(
        withSequence(
          withTiming(1, { duration: SHIMMER_DURATION_MS }),
          withDelay(SHIMMER_PAUSE_MS, withTiming(0, { duration: 0 }))
        ),
        -1,
        false
      )
    )

    return () => {
      cancelAnimation(freeze)
      cancelAnimation(shimmer)
    }
  }, [start, freeze, shimmer])

  return (
    <View style={styles.container}>
      <Animated.Text style={snowflakeStyle}>❄️</Animated.Text>

      <View style={styles.block}>
        <Animated.View style={iceStyle}>
          <LinearGradient
            colors={iceColors}
            start={GRADIENT_START}
            end={GRADIENT_END}
            style={styles.iceGradient}
          />
          <Animated.View style={shimmerStyle} />
        </Animated.View>

        <Animated.Text style={numberStyle}>{value}</Animated.Text>
      </View>
    </View>
  )
}

export default memo(FrozenStreakHero)
