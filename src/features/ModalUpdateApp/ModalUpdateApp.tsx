import React, { FC, memo, useEffect, useRef } from 'react'
import { styles } from './ModalUpdateApp.styles'
import { Alert, View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
// import CodePush from 'react-native-code-push'
import Modal from 'react-native-modal'
import { COLORS } from '@/assets/styles/colors'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'

type Props = {}

const ModalUpdateApp: FC<Props> = () => {
  const { setShowUpdateModal } = useActions()
  const { showUpdateModal, isWatchSplash } = useAppSelector(
    (store) => store.app
  )

  const scrollViewRef = useRef<any>(null)

  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef?.current?.scrollTo(p)
    }
  }

  const startUpdate = () => {
    // CodePush.sync({
    //   installMode: CodePush.InstallMode.IMMEDIATE,
    //   updateDialog: {
    //     appendReleaseDescription: true,
    //     optionalUpdateMessage: 'Новое обновление доступно!',
    //     optionalIgnoreButtonLabel: 'Игнорировать',
    //     optionalInstallButtonLabel: 'Установить',
    //   },
    // }).then((status) => {
    //   if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
    //     Alert.alert(
    //       'Обновление установлено',
    //       'Новое обновление успешно применено! Перезапустите приложение.'
    //     )
    //   }
    // })
  }

  const onCancelHandler = () => {
    setShowUpdateModal(false)
  }

  useEffect(() => {
    // if (isWatchSplash) {
    //   CodePush.checkForUpdate().then((update) => {
    //     console.log('checkForUpdate update:', update)
    //     if (update) {
    //       console.log('Обновление доступно:', update)
    //       setShowUpdateModal(true)
    //     } else {
    //       console.log('Обновлений нет.')
    //     }
    //   })
    // }
  }, [isWatchSplash])
  return (
    <Modal
      isVisible={showUpdateModal}
      testID={'modal'}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffsetMax={400}
      propagateSwipe={true}
      statusBarTranslucent
      backdropColor={COLORS.bg_modal}
      style={styles.modal}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Доступно новое обновление.</Text>

        <View style={styles.btns}>
          <Button
            style={[styles.btn, styles.btnCancel]}
            classes={{ textBtn: styles.textBtn }}
            onPress={onCancelHandler}
          >
            Отмена
          </Button>
          <Button
            onPress={startUpdate}
            style={styles.btn}
            classes={{ textBtn: styles.textBtn }}
          >
            Обновить
          </Button>
        </View>
      </View>
    </Modal>
  )
}

export default memo(ModalUpdateApp)
