import React, { FC, memo } from 'react'
import { styles } from './LanguageNativeStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetUserProfileQuery } from '@/pages/ProfileScreen/api/userServices'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from '../LanguageStatisticItem/LanguageStatisticItem'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  onOpenLanguages: () => void
  setIsNativeLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

const LanguageNativeStatistic: FC<Props> = ({
  setIsNativeLanguage,
  onOpenLanguages,
}) => {
  const { t } = useTranslation()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)

  return (
    <>
      <Text style={styles.itemText}>{t('profileScreen.native_language')}</Text>

      {profile?.native_language ? (
        <LanguageStatisticItem item={profile?.native_language} />
      ) : (
        <Text style={[styles.languagesText, styles.languagesTextEmpty]}>
          {t('profileScreen.languages_studied_not_select')}
        </Text>
      )}

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          setIsNativeLanguage(true)
          onOpenLanguages()
        }}
      >
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    </>
  )
}

export default memo(LanguageNativeStatistic)
