import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './SaveData.styles'
import { useGetItemsQuery } from '../../api/userServices'
import Text from '@/shared/UI/Text/Text'
import SaveIcon from '@/assets/icons/UI/save-primery-64.svg'
import Button from '@/shared/UI/Button/Button'
import RNFS from 'react-native-fs'
import { useActions } from '@/shared/hooks/useActions'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'

const SaveData: FC = () => {
  const { setLastSaveData } = useActions()
  const { user } = useAppSelector((store) => store.user)
  const { lastSaveData } = useAppSelector((store) => store.items)

  const { data } = useGetItemsQuery({ uid: user?.uid }, { skip: !user?.uid })

  const toSave = async () => {
    const jsonString = JSON.stringify(data)

    const path = `${RNFS.DownloadDirectoryPath}/dictinary-save.json`

    try {
      await RNFS.writeFile(path, jsonString, 'utf8')

      const dateSave = new Date()

      setLastSaveData(dateSave)
      setAsyncLocal(LOCAL_KEYS.saveDate, dateSave)
      console.log('save json')
    } catch (error) {
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

  return (
    <View style={styles.container}>
      <Button isText={false} classes={{ btn: styles.btn }} onPress={toSave}>
        <Text style={styles.btnText}>
          Сохранить карточки на устройство в виде JSON файла
        </Text>
        <SaveIcon width={30} height={30} />
      </Button>

      {!!dateSaveText && <Text style={styles.saveData}>{dateSaveText}</Text>}
    </View>
  )
}

export default SaveData
