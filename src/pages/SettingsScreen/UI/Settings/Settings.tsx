import { useAppSelector } from '@/shared/hooks/useStore'
import React, { type FC, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './Settings.styles'
import Select from '@/shared/UI/Select/Select'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../../ProfileScreen/api/userServices'
import SaveData from '../SaveData/SaveData'
import UpdateButton from '../UpdateButton/UpdateButton'
import { useTranslation } from '@/shared/i18n/types'
import { ShowVariantList } from '@/shared/store/slice/userSlice'
import { getShowVariantsList } from './data'

const Settings: FC = () => {
  const { t } = useTranslation()
  const { aplication, appLanguage } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)

  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const [showVariantSelect, setShowVariantSelect] =
    useState<ShowVariantList | null>(null)

  const showVariantList = useMemo(() => {
    return aplication?.showVariantsList
      ? getShowVariantsList(aplication?.showVariantsList, t)
      : []
  }, [aplication, t, appLanguage])

  const onSelectShowVariant = (v: ShowVariantList) => {
    if (firebaseData && firebaseData) {
      updateUserProfile({
        data: { ...firebaseData, showVariantList: v as any },
        uid: firebaseData?.uid,
      })
      setShowVariantSelect(v)
    }
  }

  useEffect(() => {
    if (!showVariantSelect && profile) {
      setShowVariantSelect(profile.showVariantList)
    }
  }, [profile, showVariantSelect])

  return (
    <View style={styles.container}>
      <Select
        title={t('settingsScreen.show_varian')}
        select={showVariantSelect}
        onSelect={onSelectShowVariant}
        labelField={'label'}
        valueField="value"
        options={showVariantList}
      />

      <UpdateButton />

      <SaveData />
    </View>
  )
}

export default Settings
