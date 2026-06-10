import React, { memo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { SvgProps } from 'react-native-svg'

type Props = Omit<SvgProps, 'style'> & {
  Component: React.ComponentType<SvgProps>
  style?: StyleProp<ViewStyle>
}

export const SvgIcon = memo(({ Component, ...svgProps }: Props) => {
  return <Component {...svgProps} />
})
