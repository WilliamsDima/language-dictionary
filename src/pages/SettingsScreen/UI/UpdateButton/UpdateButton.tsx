import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './UpdateButton.styles'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import CodePush from 'react-native-code-push'

const UpdateButton: FC = () => {
  const { setShowUpdateModal } = useActions()

  const [updateAvailable, setUpdateAvailable] = useState(false)

  const startUpdate = () => {
    setShowUpdateModal(true)
  }

  useEffect(() => {
    CodePush.checkForUpdate().then((update) => {
      if (update) {
        setUpdateAvailable(true)
      }
    })
  }, [])

  return updateAvailable ? (
    <View style={styles.container}>
      <Button
        classes={{ btn: styles.btn, textBtn: styles.btnText }}
        onPress={startUpdate}
      >
        Доступно обновление
      </Button>
    </View>
  ) : (
    <></>
  )
}

export default UpdateButton
