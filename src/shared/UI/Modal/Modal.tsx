import React, { FC, ReactNode, useMemo, memo } from 'react'
import { ModalProps, Modal as ModalRN } from 'react-native'
import { styles } from './Modal.styles'

/**
 * Модалка
 *
 * @format
 */

interface Props extends ModalProps {
  children: ReactNode
}

const Modal: FC<Props> = (props) => {
  const { children, style, statusBarTranslucent, ...rest } = props

  const overStyle = useMemo(() => {
    return [styles.modal, style]
  }, [])

  return (
    <ModalRN
      style={overStyle}
      statusBarTranslucent={statusBarTranslucent}
      {...rest}
    >
      {children}
    </ModalRN>
  )
}

export default memo(Modal)
