import {View, type StyleProp, type ViewStyle} from 'react-native'
import React from 'react'
import {SafeAreaView, type SafeAreaViewProps} from 'react-native-safe-area-context'

type Props = SafeAreaViewProps & {
  children: React.ReactNode
  style: StyleProp<ViewStyle>
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
