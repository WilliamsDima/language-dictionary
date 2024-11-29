import React, { FC, memo } from 'react'
import { styles } from './LanguageNativeStatistic.styles'
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

const LanguageNativeStatistic: FC<Props> = ({
  setIsNativeLanguage,
  setShowModalLanguages,
}) => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)

  return (
    <>
      <Text style={styles.itemText}>Родной язык: </Text>

      {profile?.native_language ? (
        <LanguageStatisticItem item={profile?.native_language} />
      ) : (
        <Text style={[styles.languagesText, styles.languagesTextEmpty]}>
          не указан
        </Text>
      )}

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          setIsNativeLanguage(true)
          setShowModalLanguages(true)
        }}
      >
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    </>
  )
}

export default memo(LanguageNativeStatistic)
