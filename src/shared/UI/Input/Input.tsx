import React, {
  FC,
  memo,
  useCallback,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  ColorValue,
  TextStyle,
} from 'react-native'
import { StyleSheet, useUnistyles } from 'react-native-unistyles'

import { styles } from './Input.styles'

export interface InputProps extends TextInputProps {
  classes?: {
    input?: ViewStyle | ViewStyle[]
    wrapper?: ViewStyle | ViewStyle[]
    wrapperInput?: ViewStyle | ViewStyle[]
    titleStyle?: TextStyle | TextStyle[]
    customPlaceholder?: TextStyle | TextStyle[]
  }
  title?: string
  placeholderTextColor?: ColorValue
  children?: ReactNode
  rightIcon?: ReactNode
  customPlaceholder?: {
    additionalLeft?: string
    additionalRight?: string
    placeholder?: string
  }
}

/**
 * UI Компанента инпут
 *
 * @format
 *
 * Использовать onChangeText, для прослушивания
 */

const Input: FC<InputProps> = (props) => {
  const {
    classes,
    title,
    placeholderTextColor,
    rightIcon,
    style,
    value,
    children,
    customPlaceholder,
    onChangeText,
    ...rest
  } = props

  const { theme } = useUnistyles()
  const [focus, setFocus] = useState(false)

  styles.useVariants({
    focus,
    hasRightIcon: !!rightIcon,
  })

  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [setFocus])

  const handleBlur = useCallback(() => {
    setFocus(false)
  }, [setFocus])

  const onHandleChangeText = (text: string) => {
    const additionalText =
      customPlaceholder?.additionalLeft || customPlaceholder?.additionalRight
    let nText = text
    if (!additionalText) {
      onChangeText && onChangeText(nText)
      return
    }
    if (!text.startsWith(additionalText)) {
      if (customPlaceholder?.additionalLeft) {
        nText =
          additionalText + nText.slice(additionalText.length, nText.length)
      }
      if (customPlaceholder?.additionalRight) {
        nText =
          additionalText + nText.slice(nText.length, additionalText.length)
      }
    }

    onChangeText && onChangeText(nText)
  }

  const stylesHandler = useMemo(() => {
    return StyleSheet.flatten([styles.input, classes?.input, style])
  }, [classes?.input, style])

  const stylesTitle = useMemo(() => {
    return [styles.title, classes?.titleStyle]
  }, [classes?.titleStyle])

  const overStylesWrapper = useMemo(() => {
    return [styles.wrapper, classes?.wrapper]
  }, [classes?.wrapper])

  const overStylesWrapperInput = useMemo(() => {
    return [styles.wrapperInput, classes?.wrapperInput]
  }, [classes?.wrapperInput])

  useEffect(() => {
    onChangeText &&
      customPlaceholder?.additionalLeft &&
      onChangeText(customPlaceholder?.additionalLeft)
  }, [])

  return (
    <View style={overStylesWrapper}>
      {!!title && <Text style={stylesTitle}>{title}</Text>}

      <View style={overStylesWrapperInput}>
        <TextInput
          // value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor={
            placeholderTextColor || theme.colors.palette.dark_placeholder
          }
          style={stylesHandler}
          {...rest}
          onChangeText={onHandleChangeText}
        >
          {value || children}
        </TextInput>

        {!!rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </View>
  )
}

export default memo(Input)
