import React, { FC, memo, useEffect, useRef } from 'react'
import { styles } from './ModalUpdateApp.styles'
import { View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Button from '@/shared/UI/Button/Button'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import { useTranslation } from '@/shared/i18n/types'

type Props = {}

const ModalUpdateApp: FC<Props> = () => {
  const { setShowUpdateModal } = useActions()
  const { showUpdateModal } = useAppSelector((store) => store.app)
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const { t } = useTranslation()
  const wasVisibleRef = useRef(false)

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
      title={t('modal.modalUpdateApp.title')}
      subtitle={t('modal.modalUpdateApp.subtitle')}
      variant="view"
      dynamicSizing
    >
      <View style={styles.btns}>
        <Button
          style={[styles.btn, styles.btnCancel]}
          classes={{ textBtn: styles.textBtnCancel }}
          onPress={onCancelHandler}
        >
          {t('ui.cancel')}
        </Button>
        <Button
          onPress={startUpdate}
          style={styles.btn}
          classes={{ textBtn: styles.textBtnConfirm }}
        >
          {t('settingsScreen.update')}
        </Button>
      </View>
    </BottomSheet>
  )
}

export default memo(ModalUpdateApp)
