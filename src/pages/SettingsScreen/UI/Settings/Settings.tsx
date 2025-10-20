import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './Settings.styles'
import Select from '@/shared/UI/Select/Select'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '../../../ProfileScreen/api/userServices'
import SaveData from '../SaveData/SaveData'
import UpdateButton from '../UpdateButton/UpdateButton'
import { SelectOption } from '@/shared/UI/types'
import { useTranslation } from '@/shared/i18n/types'

const Settings: FC = () => {
  const { t } = useTranslation()
  const { aplication } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)

  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const [showVariantSelect, setShowVariantSelect] =
    useState<SelectOption | null>(null)

  const onSelectShowVariant = (v: SelectOption) => {
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
        options={aplication?.showVariantsList}
      />

      <UpdateButton />

      <SaveData />
    </View>
  )
}

export default Settings
