import React, { FC } from 'react'
import { styles } from './Loader.styles'
import LottieView from 'lottie-react-native'
import { StyleProp, ViewStyle } from 'react-native'

type Props = {
  lottieStyles?: StyleProp<ViewStyle>
}

const Loader: FC<Props> = (props) => {
  const { lottieStyles } = props

  return (
    <LottieView
      source={require('../../json/anim-loader.json')}
      style={[styles.anim, lottieStyles]}
      autoPlay
      loop
    />
  )
}

export default Loader
