import React, { FC, memo, useEffect, useRef } from 'react'
import { styles } from './ModalUpdateApp.styles'
import { View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'

type Props = {}

const ModalUpdateApp: FC<Props> = () => {
  const { setShowUpdateModal } = useActions()
  const { showUpdateModal } = useAppSelector((store) => store.app)
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const wasVisibleRef = useRef(false)

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

  useEffect(() => {
    if (showUpdateModal && !wasVisibleRef.current) {
      presentSheet()
    }

    if (!showUpdateModal && wasVisibleRef.current) {
      dismissSheet()
    }

    wasVisibleRef.current = showUpdateModal
  }, [dismissSheet, presentSheet, showUpdateModal])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onCancelHandler}
      title="Доступно новое обновление."
      subtitle="Установи свежую версию, чтобы получить последние улучшения и исправления."
      variant="view"
      dynamicSizing
    >
      <View style={styles.btns}>
        <Button
          style={[styles.btn, styles.btnCancel]}
          classes={{ textBtn: styles.textBtnCancel }}
          onPress={onCancelHandler}
        >
          Отмена
        </Button>
        <Button
          onPress={startUpdate}
          style={styles.btn}
          classes={{ textBtn: styles.textBtnConfirm }}
        >
          Обновить
        </Button>
      </View>
    </BottomSheet>
  )
}

export default memo(ModalUpdateApp)
