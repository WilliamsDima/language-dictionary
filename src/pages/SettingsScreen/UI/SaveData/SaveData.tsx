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
import SaveDataTooltip from '../SaveDataTooltip/SaveDataTooltip'

const SaveData: FC = () => {
  const { setLastSaveData, setTooltip } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { lastSaveData } = useAppSelector((store) => store.items)

  const { data } = useGetItemsQuery(
    { uid: firebaseData?.uid },
    { skip: !firebaseData?.uid }
  )

  const toSave = async () => {
    const jsonString = JSON.stringify(data)

    const path = `${RNFS.DownloadDirectoryPath}/dictinary-save.json`

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

  return !!data?.length ? (
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
