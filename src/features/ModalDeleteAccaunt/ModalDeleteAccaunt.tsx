import React, { FC, memo } from 'react'
import { styles } from './ModalDeleteAccaunt.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { useAuth } from '@/shared/hooks/useAuth'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'

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
  const { t } = useTranslation()
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
              {t('modal.modalDeleteAccaunt.title')}
            </Text>

            <Text style={styles.text}>
              {t('modal.modalDeleteAccaunt.text')}
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
                {t('ui.cancel')}
              </Button>

              <Button
                classes={{
                  btn: [styles.btn, styles.logout],
                  textBtn: styles.logoutText,
                }}
                onPress={deleteAccaunt}
              >
                {t('ui.delete')}
              </Button>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalDeleteAccaunt)
