import React, { FC, memo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './UserStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/pages/SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import ModalAddLanguages from '@/features/ModalAddLanguages/ModalAddLanguages'
import { ILanguage } from '@/shared/json/languages'
import LanguageStatisticList from './UI/LanguageStatisticList/LanguageStatisticList'
import LanguageNativeStatistic from './UI/LanguageNativeStatistic/LanguageNativeStatistic'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserStatistic: FC<Props> = (props) => {
  const { user } = useAppSelector((store) => store.user)

  const [showModalLanguages, setShowModalLanguages] = useState(false)
  const [isNativeLanguage, setIsNativeLanguage] = useState(false)

  const { data: profile } = useGetUserProfileQuery(user?.uid)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  console.log('profile', profile)

  const onSelectLanguages = (langs: ILanguage[]) => {
    if (user && profile) {
      if (isNativeLanguage) {
        updateUserProfile({
          data: { ...profile, native_language: langs[0] || null },
          uid: user?.uid,
        })
      } else {
        updateUserProfile({
          data: { ...profile, languages: langs },
          uid: user?.uid,
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.statistic}>Статистика:</Text>

      <View style={styles.item}>
        <Text style={styles.itemText}>Всего слов/правил/предложений: 0</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>Изучено: 0</Text>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemText}>В процессе: 0</Text>
      </View>

      <View style={styles.item}>
        <LanguageStatisticList
          setIsNativeLanguage={setIsNativeLanguage}
          setShowModalLanguages={setShowModalLanguages}
        />
      </View>

      <View style={styles.item}>
        <LanguageNativeStatistic
          setIsNativeLanguage={setIsNativeLanguage}
          setShowModalLanguages={setShowModalLanguages}
        />
      </View>

      <ModalAddLanguages
        setVisible={setShowModalLanguages}
        onConfirm={onSelectLanguages}
        visible={showModalLanguages}
        multiselect={!isNativeLanguage}
        selects={
          isNativeLanguage
            ? profile?.native_language
              ? [profile?.native_language]
              : []
            : profile?.languages
        }
      />
    </View>
  )
}

export default memo(UserStatistic)
