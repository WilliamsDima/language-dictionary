import React, { FC, memo } from 'react'
import { styles } from './ModalDeleteAccaunt.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import DropShadow from 'react-native-drop-shadow'
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

const ModalDeleteAccaunt: FC<Props> = ({ visible, setVisible }) => {
  const { deleteAccaunt } = useAuth()

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
      statusBarTranslucent
      onRequestClose={onCancelHandler}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onCancelHandler}
      >
        <Animated.View style={[getAnimationStyles(), styles.wrapperContainer]}>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TouchableOpacity style={styles.container} activeOpacity={1}>
              <Text style={styles.title}>
                Вы уверены что хотите удалить аккаунт?
              </Text>

              <Text style={styles.text}>
                Вы не сможите восстановить данные аккаунта после удаления, ваши
                данные будут удалены навсегда.
              </Text>

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
                  onPress={deleteAccaunt}
                >
                  удалить
                </Button>
              </View>
            </TouchableOpacity>
          </DropShadow>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalDeleteAccaunt)
