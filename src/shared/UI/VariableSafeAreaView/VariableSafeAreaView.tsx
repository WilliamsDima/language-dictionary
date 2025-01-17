import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

type Props = SafeAreaViewProps & {
  children: React.ReactNode
  style: ViewStyle
  isSafeArea: boolean
}

const VariableSafeAreaView = ({
  style,
  children,
  isSafeArea,
  ...safeAreaProps
}: Props) => {
  if (!isSafeArea) {
    return <View style={style}>{children}</View>
  }
  return (
    <SafeAreaView
      style={style}
      edges={['right', 'left', 'top']}
      {...safeAreaProps}
    >
      {children}
    </SafeAreaView>
  )
}

export default VariableSafeAreaView
