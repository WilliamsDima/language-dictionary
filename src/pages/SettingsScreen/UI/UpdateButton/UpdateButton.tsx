import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './UpdateButton.styles'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { useTranslation } from '@/shared/i18n/types'

const UpdateButton: FC = () => {
  const { t } = useTranslation()
  const { setShowUpdateModal } = useActions()

  const updateAvailable = false

  const startUpdate = () => {
    setShowUpdateModal(true)
  }

  return updateAvailable ? (
    <View style={styles.container}>
      <Button
        classes={{ btn: styles.btn, textBtn: styles.btnText }}
        onPress={startUpdate}
      >
        {t('settingsScreen.update_is_available')}
      </Button>
    </View>
  ) : (
    <></>
  )
}

export default UpdateButton
