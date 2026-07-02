import React, { FC, useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'
import { _registerToast } from './toast'
import { ToastConfig } from './types'
import ToastItem from './ToastItem'

const _idCounter = { current: 0 }

const Toast: FC = () => {
  const { rt, theme } = useUnistyles()
  const [queue, setQueue] = useState<ToastConfig[]>([])
  const [current, setCurrent] = useState<ToastConfig | null>(null)

  const handleDismiss = useCallback(() => {
    setCurrent(null)
  }, [])

  useEffect(() => {
    _registerToast({
      show: (config) => {
        _idCounter.current += 1
        const id = String(_idCounter.current)
        setQueue((prev) => [...prev, { ...config, id }])
      },
    })
    return () => _registerToast(null)
  }, [])

  useEffect(() => {
    if (current === null && queue.length > 0) {
      const [next, ...rest] = queue
      setCurrent(next)
      setQueue(rest)
    }
  }, [queue, current])

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {current ? (
        <ToastItem
          key={current.id}
          config={current}
          top={rt.insets.top + theme.size.s8}
          onDismiss={handleDismiss}
        />
      ) : (
        <></>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
})

export default Toast
