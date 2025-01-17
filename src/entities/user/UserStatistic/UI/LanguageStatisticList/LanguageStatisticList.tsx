import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './LanguageStatisticList.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetUserProfileQuery } from '@/pages/SettingsScreen/api/userServices'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from '../LanguageStatisticItem/LanguageStatisticItem'

type Props = {
  setShowModalLanguages: React.Dispatch<React.SetStateAction<boolean>>
  setIsNativeLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

const LanguageStatisticList: FC<Props> = ({
  setIsNativeLanguage,
  setShowModalLanguages,
}) => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)

  return (
    <>
      {profile?.languages?.length ? (
        <View style={styles.languages}>
          <Text style={styles.itemText}>Изучаемые языки:</Text>
          {profile?.languages.map((item) => {
            return <LanguageStatisticItem key={item.id} item={item} />
          })}

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setIsNativeLanguage(false)
              setShowModalLanguages(true)
            }}
          >
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.itemText}>Изучаемые языки: </Text>
          <Text style={[styles.languagesText, styles.languagesTextEmpty]}>
            не выбраны
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setIsNativeLanguage(false)
              setShowModalLanguages(true)
            }}
          >
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </>
      )}
    </>
  )
}

export default memo(LanguageStatisticList)
