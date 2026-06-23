import { useActions } from '@/shared/hooks/useActions'
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
import { MainButtonSide, ShowVariantList } from '@/shared/store/slice/userSlice'
import {
  getMainButtonSidesList,
  getShowVariantsList,
  normalizeMainButtonSide,
} from './data'

const Settings: FC = () => {
  const { t } = useTranslation()
  const { setFirebaseData } = useActions()
  const { aplication, appLanguage } = useAppSelector((store) => store.app)
  const { firebaseData } = useAppSelector((store) => store.user)

  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const [showVariantSelect, setShowVariantSelect] =
    useState<ShowVariantList | null>(null)
  const [mainButtonSideSelect, setMainButtonSideSelect] =
    useState<MainButtonSide | null>(null)
  const userProfile = profile || firebaseData

  const showVariantList = useMemo(() => {
    return aplication?.showVariantsList
      ? getShowVariantsList(aplication?.showVariantsList, t)
      : []
  }, [aplication, t, appLanguage])

  const mainButtonSidesList = useMemo(() => {
    return getMainButtonSidesList(t)
  }, [t, appLanguage])

  const normalizedMainButtonSide = useMemo(() => {
    const normalizedValue = normalizeMainButtonSide(userProfile?.mainButtonSide)

    return (
      mainButtonSidesList.find((item) => item.value === normalizedValue) ||
      mainButtonSidesList[0] ||
      null
    )
  }, [mainButtonSidesList, userProfile?.mainButtonSide])

  const onSelectShowVariant = async (v: ShowVariantList) => {
    if (userProfile?.uid) {
      const nextProfile = { ...userProfile, showVariantList: v }

      await updateUserProfile({
        data: nextProfile,
        uid: userProfile.uid,
      })

      setFirebaseData(nextProfile)
      setShowVariantSelect(v)
    }
  }

  const onSelectMainButtonSide = async (v: MainButtonSide) => {
    if (userProfile?.uid) {
      const nextProfile = { ...userProfile, mainButtonSide: v }

      await updateUserProfile({
        data: nextProfile,
        uid: userProfile.uid,
      })

      setFirebaseData(nextProfile)
      setMainButtonSideSelect(v)
    }
  }

  useEffect(() => {
    if (!showVariantSelect && userProfile) {
      setShowVariantSelect(userProfile.showVariantList)
    }
  }, [showVariantSelect, userProfile])

  useEffect(() => {
    if (!mainButtonSideSelect && userProfile) {
      setMainButtonSideSelect(normalizedMainButtonSide)
    }
  }, [mainButtonSideSelect, normalizedMainButtonSide, userProfile])

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

      <Select
        title={t('settingsScreen.main_button_side')}
        select={mainButtonSideSelect}
        onSelect={onSelectMainButtonSide}
        labelField={'label'}
        valueField="value"
        options={mainButtonSidesList}
      />

      <SaveData />
      <UpdateButton />
    </View>
  )
}

export default Settings
