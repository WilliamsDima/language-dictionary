import React, { FC, useMemo } from 'react'
import { Text as TextRN, TextProps } from 'react-native'
import { styles } from './Text.styles'
import { useAppSelector } from '@/shared/hooks/useStore'
import { COLORS } from '@/assets/styles/colors'

/**
 * UI Text
 *
 * @format
 */

interface Props extends TextProps {}

const Text: FC<Props> = (props) => {
  const { style, ...rest } = props

  const { theme } = useAppSelector((store) => store.app)

  const color = useMemo(() => {
    return theme === 'dark' ? COLORS.white : COLORS.black
  }, [theme])

  return <TextRN style={[styles.text, { color }, style]} {...rest}></TextRN>
}

export default Text
