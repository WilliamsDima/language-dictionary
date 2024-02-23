import React, { FC, ReactNode, useMemo, memo } from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
  TouchableOpacityProps,
  Pressable,
} from 'react-native'
import { styles } from './Button.styles'

/**
 * UI Button
 *
 * @format
 */

interface Props extends TouchableOpacityProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  classes?: {
    btn?: ViewStyle | ViewStyle[]
    textBtn?: TextStyle
  }
  children: ReactNode
  disabled?: boolean
  isText?: boolean
  isPreseble?: boolean
  presebleColor?: string
  type?: 'BORDER-TRANSPARENT' | 'TRANSPARENT' | 'PRIMERY'
}

const Button: FC<Props> = (props) => {
  const {
    classes,
    onPress,
    style,
    children,
    isPreseble,
    presebleColor,
    isText = true,
    disabled = false,
    type,
    ...rest
  } = props

  const stylesType = useMemo(() => {
    if (type) {
      const text = type + '-TEXT'
      return {
        btn: [styles[type]],
        text: [styles[text as never]],
      }
    }
  }, [type])

  const stylesDisabled = useMemo(() => {
    return disabled ? styles.disabled : {}
  }, [disabled])

  const stylesBtn = useMemo(() => {
    return [
      !isPreseble && styles.button,
      !isPreseble && stylesType?.btn,
      classes?.btn,
      stylesDisabled,
      style,
    ]
  }, [stylesDisabled, styles, isPreseble, classes?.btn, stylesType, style])

  const stylesText = useMemo(() => {
    return [styles.btnText, stylesType?.text, classes?.textBtn]
  }, [classes?.textBtn])

  return isPreseble ? (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? presebleColor || 'transparent'
            : 'transparent',
        },
        stylesBtn,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {isText ? <Text style={stylesText}>{children}</Text> : children}
    </Pressable>
  ) : (
    <TouchableOpacity
      style={stylesBtn}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {isText ? <Text style={stylesText}>{children}</Text> : children}
    </TouchableOpacity>
  )
}

export default memo(Button)
