import React, { FC, ReactNode, useMemo, memo } from 'react'
import {
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { styles } from './OutsideView.styles'
import OutsidePressHandler from 'react-native-outside-press'

/**
 * UI Card
 *
 * @format
 */

interface Props extends TouchableOpacityProps {
  style?: ViewStyle
  children: ReactNode
  onOutsidePress?: () => void
  visible: boolean
  classes?: {
    wrapper?: ViewStyle | ViewStyle[]
    conteiner?: ViewStyle | ViewStyle[]
  }
}

const OutsideView: FC<Props> = (props) => {
  const { style, children, classes, visible, onOutsidePress, ...rest } = props

  const overStyleWrapper = useMemo(() => {
    return [styles.wrapper, classes?.wrapper, visible && styles.visible]
  }, [style, visible, classes?.wrapper])

  const overStyle = useMemo(() => {
    return [styles.conteiner, classes?.conteiner, style]
  }, [style, classes?.conteiner])

  return (
    <OutsidePressHandler
      style={overStyleWrapper}
      onOutsidePress={() => onOutsidePress && onOutsidePress()}
    >
      <TouchableOpacity {...rest} style={overStyle} activeOpacity={1}>
        {children}
      </TouchableOpacity>
    </OutsidePressHandler>
  )
}

export default memo(OutsideView)
