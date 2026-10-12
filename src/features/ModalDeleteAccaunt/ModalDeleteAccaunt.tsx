import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
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

// удаление аккаунта необратимо — кнопка «Удалить» становится активной только
// после паузы, чтобы пользователь успел прочитать предупреждение
const DELETE_CONFIRM_DELAY_SEC = 30

const ModalDeleteAccaunt: FC<Props> = ({ visible, setVisible }) => {
  const { t } = useTranslation()
  const [secondsLeft, setSecondsLeft] = useState(DELETE_CONFIRM_DELAY_SEC)
  const { deleteAccaunt } = useAuth()

  const { getAnimationStyles } = useScaleAnim({
    active: visible,
  })

  const isDeleteLocked = useMemo(() => secondsLeft > 0, [secondsLeft])

  const deleteText = useMemo(
    () =>
      isDeleteLocked ? `${t('ui.delete')} (${secondsLeft})` : t('ui.delete'),
    [isDeleteLocked, secondsLeft, t]
  )

  const cancelClasses = useMemo(
    () => ({
      btn: [styles.btn, styles.cancel],
      textBtn: styles.cancelText,
    }),
    []
  )

  const deleteClasses = useMemo(
    () => ({
      btn: [styles.btn, styles.logout],
      textBtn: styles.logoutText,
    }),
    []
  )

  const onCancelHandler = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  // отсчёт стартует при каждом открытии модалки и сбрасывается при закрытии
  useEffect(() => {
    setSecondsLeft(DELETE_CONFIRM_DELAY_SEC)

    if (!visible) return

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [visible])

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
                classes={cancelClasses}
                onPress={onCancelHandler}
              >
                {t('ui.cancel')}
              </Button>

              <Button
                classes={deleteClasses}
                disabled={isDeleteLocked}
                onPress={deleteAccaunt}
              >
                {deleteText}
              </Button>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalDeleteAccaunt)
