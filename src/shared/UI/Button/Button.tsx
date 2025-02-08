import React, { FC, ReactNode, useMemo, memo } from 'react'
import {
  GestureResponderEvent,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  Pressable,
  StyleProp,
  StyleSheet,
} from 'react-native'
import { styles } from './Button.styles'
import Text from '../Text/Text'
import LinearGradient from 'react-native-linear-gradient'

/**
 * UI Button
 *
 * @format
 */

interface Props extends TouchableOpacityProps {
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  classes?: {
    btn?: StyleProp<ViewStyle>
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

  const stylesBtn: StyleProp<ViewStyle> = useMemo(() => {
    return StyleSheet.flatten([
      !isPreseble && styles.button,
      !isPreseble && stylesType?.btn,
      classes?.btn,
      stylesDisabled,
      style,
    ])
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
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.1)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.3)',
        ]}
        locations={[0, 0.3, 0.6, 0.8, 1]} // Плавный градиент
        style={[
          styles.innerShadow,
          {
            borderBottomLeftRadius:
              stylesBtn?.borderBottomLeftRadius ?? stylesBtn?.borderRadius ?? 0,
            borderBottomRightRadius:
              stylesBtn?.borderBottomRightRadius ??
              stylesBtn?.borderRadius ??
              0,
          },
        ]}
      />
      {isText ? <Text style={stylesText}>{children}</Text> : children}
    </Pressable>
  ) : (
    <TouchableOpacity
      style={stylesBtn}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <LinearGradient
        colors={[
          'transparent',
          'rgba(0, 0, 0, 0.05)',
          'rgba(0, 0, 0, 0.1)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(0, 0, 0, 0.3)',
        ]}
        locations={[0, 0.3, 0.6, 0.8, 1]} // Плавный градиент
        style={[
          styles.innerShadow,
          {
            borderBottomLeftRadius:
              stylesBtn?.borderBottomLeftRadius ?? stylesBtn?.borderRadius ?? 0,
            borderBottomRightRadius:
              stylesBtn?.borderBottomRightRadius ??
              stylesBtn?.borderRadius ??
              0,
          },
        ]}
      />
      {isText ? <Text style={stylesText}>{children}</Text> : children}
    </TouchableOpacity>
  )
}

export default memo(Button)
