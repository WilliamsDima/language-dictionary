import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './SaveData.styles'
import Text from '@/shared/UI/Text/Text'
import SaveIcon from '@/assets/icons/UI/save-primery-64.svg'
import Button from '@/shared/UI/Button/Button'
import * as RNFS from '@dr.pogodin/react-native-fs'
import { useActions } from '@/shared/hooks/useActions'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import SaveDataTooltip from '../SaveDataTooltip/SaveDataTooltip'
import { copyToClipboard } from '@/shared/helpers/copyToClipboard'

const SaveData: FC = () => {
  const { setLastSaveData, setTooltip } = useActions()

  const { lastSaveData, items } = useAppSelector((store) => store.items)

  const toSave = async () => {
    const jsonString = JSON.stringify(items)

    //console.log('jsonString', jsonString)

    const path = `${
      RNFS.DownloadDirectoryPath
    }/dictinary-save-${new Date().getTime()}.json`

    try {
      await RNFS.writeFile(path, jsonString, 'utf8')

      const dateSave = new Date()

      setTooltip({ children: <SaveDataTooltip path={path} />, time: 3000 })
      setLastSaveData(dateSave)
      setAsyncLocal(LOCAL_KEYS.saveDate, dateSave)
      console.log('save json')
    } catch (error) {
      setTooltip({
        children: <SaveDataTooltip error path={path} />,
        time: 3000,
      })
      copyToClipboard(jsonString)
      console.log('save json Error', error)
    }
  }

  const dateSaveText = useMemo(() => {
    if (lastSaveData) {
      return `${new Date(lastSaveData).toLocaleDateString()} ${new Date(
        lastSaveData
      ).toLocaleTimeString()}`
    }
    return ''
  }, [lastSaveData])

  return !!Object.keys(items)?.length ? (
    <View style={styles.container}>
      <Button isText={false} classes={{ btn: styles.btn }} onPress={toSave}>
        <Text style={styles.btnText}>Сохранить карточки как JSON файл</Text>
        <SaveIcon width={30} height={30} />
      </Button>

      {!!dateSaveText && <Text style={styles.saveData}>{dateSaveText}</Text>}
    </View>
  ) : (
    <></>
  )
}

export default SaveData
