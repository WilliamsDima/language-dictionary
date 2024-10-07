import React, { FC, memo } from 'react'
import { styles } from './ModalDeleteItem.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import DropShadow from 'react-native-drop-shadow'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useDeleteItemMutation } from '@/pages/SettingsScreen/api/userServices'

type Props = {}

const ModalDeleteItem: FC<Props> = () => {
  const { setModalDeleteItem } = useActions()
  const { user } = useAppSelector((store) => store.user)
  const { modalDeleteItem } = useAppSelector((store) => store.items)

  const [deleteItem] = useDeleteItemMutation()

  const { getAnimationStyles } = useScaleAnim({
    active: !!modalDeleteItem,
  })

  const onCancelHandler = () => {
    setModalDeleteItem(null)
  }

  const onDelete = () => {
    if (modalDeleteItem?.idDoc && user) {
      deleteItem({ idDoc: modalDeleteItem.idDoc, uid: user.uid })
      onCancelHandler()
    }
  }

  return (
    <Modal
      visible={!!modalDeleteItem}
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
                Вы уверены что хотите удалить карточку?
              </Text>

              <Text style={styles.text}>
                Вы не сможите восстановить её после удаления.
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
                  onPress={onDelete}
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

export default memo(ModalDeleteItem)
