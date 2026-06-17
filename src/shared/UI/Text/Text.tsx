import React, { FC } from 'react'
import { Text as TextRN, TextProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { styles } from './Text.styles'

/**
 * UI Text
 *
 * @format
 */

interface Props extends TextProps {}

const Text: FC<Props> = (props) => {
  const { style, ...rest } = props

  return (
    <TextRN style={StyleSheet.compose(styles.text, style)} {...rest}>
      {props.children}
    </TextRN>
  )
}

export default Text
