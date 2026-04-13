import React, { FC, memo, useRef } from 'react'
import { styles } from './ModalUpdateApp.styles'
import { View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Modal from 'react-native-modal'
import { COLORS } from '@/assets/styles/colors'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'

type Props = {}

const ModalUpdateApp: FC<Props> = () => {
  const { setShowUpdateModal } = useActions()
  const { showUpdateModal } = useAppSelector((store) => store.app)

  const scrollViewRef = useRef<any>(null)

  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef?.current?.scrollTo(p)
    }
  }

  const startUpdate = () => {}

  const onCancelHandler = () => {
    setShowUpdateModal(false)
  }

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
