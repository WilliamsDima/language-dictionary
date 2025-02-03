import React, { FC, memo } from 'react'
import { styles } from './ModalDeleteItem.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useCards } from '@/shared/hooks/useCards'

type Props = {}

const ModalDeleteItem: FC<Props> = () => {
  const { setModalDeleteItem } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { modalDeleteItem } = useAppSelector((store) => store.items)

  const { deleteItemHandler } = useCards()

  const { getAnimationStyles } = useScaleAnim({
    active: !!modalDeleteItem,
  })

  const onCancelHandler = () => {
    setModalDeleteItem(null)
  }

  const onDelete = async () => {
    if (modalDeleteItem?.idDoc && firebaseData) {
      await deleteItemHandler(modalDeleteItem.idDoc)
      onCancelHandler()
    }
  }

  return (
    <Modal
      visible={!!modalDeleteItem}
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
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalDeleteItem)
