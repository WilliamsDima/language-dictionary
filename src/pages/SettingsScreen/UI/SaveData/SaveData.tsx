import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './SaveData.styles'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import * as RNFS from '@dr.pogodin/react-native-fs'
import { useActions } from '@/shared/hooks/useActions'
import { useAllItems } from '@/shared/hooks/useAllItems'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { toast } from '@/shared/UI/Toast/toast'
import { copyToClipboard } from '@/shared/helpers/copyToClipboard'
import { useTranslation } from '@/shared/i18n/types'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { Icon } from '@/assets/icons/Icon'
import { useUnistyles } from 'react-native-unistyles'

const SaveData: FC = () => {
  const { t } = useTranslation()
  const { setLastSaveData } = useActions()
  const { theme } = useUnistyles()

  const { lastSaveData } = useAppSelector((store) => store.items)
  const { allItems } = useAllItems()

  const toSave = async () => {
    const jsonString = JSON.stringify(allItems ?? [])

    //console.log('jsonString', jsonString)

    const path = `${
      RNFS.DownloadDirectoryPath
    }/dictinary-save-${new Date().getTime()}.json`

    try {
      await RNFS.writeFile(path, jsonString, 'utf8')

      const dateSave = new Date()

      toast.success(t('settingsScreen.save_json_success', { path }))
      setLastSaveData(dateSave)
      setAsyncLocal(LOCAL_KEYS.saveDate, dateSave)
      console.log('save json')
    } catch (error) {
      toast.error(t('settingsScreen.save_json_error'))
      copyToClipboard(jsonString)
      console.log('save json Error', error)
    }
  }

  const dateSaveText = useMemo(() => {
    if (lastSaveData) {
      const formattedDate = dateFormat({ date: lastSaveData, type: 'FULL' })

      if (!formattedDate) {
        return ''
      }

      return `${formattedDate} ${new Date(lastSaveData).toLocaleTimeString()}`
    }
    return ''
  }, [lastSaveData])

  return allItems?.length ? (
    <View style={styles.container}>
      <Button isText={false} classes={{ btn: styles.btn }} onPress={toSave}>
        <Text style={styles.btnText}>{t('settingsScreen.save_json')}</Text>
        <Icon
          kind="svg"
          name="download"
          color={theme.colors.palette.primery}
          width={25}
          height={25}
        />
      </Button>

      {!!dateSaveText && <Text style={styles.saveData}>{dateSaveText}</Text>}
    </View>
  ) : (
    <></>
  )
}

export default SaveData
