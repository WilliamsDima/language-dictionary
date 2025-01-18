import React, { FC, memo } from 'react'
import { styles } from './ModalLogout.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { useAuth } from '@/shared/hooks/useAuth'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'

type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

/**
 * модалка подтверждения выхода из аккаунта
 *
 * @format
 */

const ModalLogout: FC<Props> = ({ visible, setVisible }) => {
  const { logoutHandler } = useAuth()

  const { getAnimationStyles } = useScaleAnim({
    active: visible,
  })

  const onCancelHandler = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onCancelHandler}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onCancelHandler}
      >
        <Animated.View style={[getAnimationStyles(), styles.wrapperContainer]}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.title}>Хотите выйти из аккаунта?</Text>

            <View style={styles.btns}>
              <Button
                type="BORDER-TRANSPARENT"
                classes={{
                  btn: [styles.btn, styles.cancel],
                  textBtn: styles.cancelText,
                }}
                onPress={onCancelHandler}
              >
                Отмена
              </Button>

              <Button
                classes={{
                  btn: [styles.btn, styles.logout],
                  textBtn: styles.logoutText,
                }}
                onPress={logoutHandler}
              >
                Выйти
              </Button>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalLogout)
