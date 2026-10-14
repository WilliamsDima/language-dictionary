import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, PanResponder, View } from 'react-native'
import { styles } from './ToastItem.styles'
import Text from '@/shared/UI/Text/Text'
import { Icon } from '@/assets/icons/Icon'
import { ToastConfig } from './types'
import { useUnistyles } from 'react-native-unistyles'

const DEFAULT_DURATION = 3000
const EXIT_OFFSET = -200
const DISMISS_SWIPE_THRESHOLD = 50
const DISMISS_VELOCITY_THRESHOLD = 0.8
const DEFAULT_MESSAGE_LINES = 2
const INFO_MESSAGE_LINES = 5

type Props = {
  config: ToastConfig
  top: number
  onDismiss: () => void
}

const ToastItem: FC<Props> = ({ config, top, onDismiss }) => {
  const translateY = useRef(new Animated.Value(EXIT_OFFSET)).current
  const opacity = useRef(new Animated.Value(0)).current
  const isExiting = useRef(false)
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  const { theme } = useUnistyles()

  styles.useVariants({ type: config.type })

  const isInfo = useMemo(() => config.type === 'info', [config.type])

  // текст info-тоста (например, сообщение из админки) бывает длиннее
  const messageLines = useMemo(
    () => (isInfo ? INFO_MESSAGE_LINES : DEFAULT_MESSAGE_LINES),
    [isInfo]
  )

  const dismiss = useCallback(() => {
    if (isExiting.current) return
    isExiting.current = true

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: EXIT_OFFSET,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismissRef.current())
  }, [translateY, opacity])

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        tension: 80,
        friction: 12,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(dismiss, config.duration ?? DEFAULT_DURATION)
    return () => clearTimeout(timer)
  }, [dismiss, config.duration, opacity, translateY])

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gs) => gs.dy < -5,
        onPanResponderMove: (_, { dy }) => {
          if (dy < 0) translateY.setValue(dy)
        },
        onPanResponderRelease: (_, { dy, vy }) => {
          if (
            dy < -DISMISS_SWIPE_THRESHOLD ||
            vy < -DISMISS_VELOCITY_THRESHOLD
          ) {
            dismiss()
          } else {
            Animated.spring(translateY, {
              toValue: 0,
              tension: 80,
              friction: 12,
              useNativeDriver: true,
            }).start()
          }
        },
      }),
    [dismiss, translateY]
  )

  return (
    <Animated.View
      style={[
        styles.container,
        { top },
        { transform: [{ translateY }], opacity },
      ]}
      {...panResponder.panHandlers}
    >
      {isInfo ? (
        <></>
      ) : (
        <Icon
          kind="svg"
          name={
            config.type === 'error' ? 'error-circle-red-64' : 'done-primery-64'
          }
          width={25}
          color={
            config.type === 'error'
              ? theme.colors.action.danger
              : theme.colors.action.success
          }
          height={25}
        />
      )}
      <View style={styles.content}>
        {config.title ? (
          <Text style={styles.title} numberOfLines={1}>
            {config.title}
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.message} numberOfLines={messageLines}>
          {config.message}
        </Text>
      </View>
    </Animated.View>
  )
}

export default memo(ToastItem)
