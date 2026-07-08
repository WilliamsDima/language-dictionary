import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { type FC, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './Settings.styles'
import Select from '@/shared/UI/Select/Select'
import SaveData from '../SaveData/SaveData'
import UpdateButton from '../UpdateButton/UpdateButton'
import AppReviewButton from '../AppReviewButton/AppReviewButton'
import { useTranslation } from '@/shared/i18n/types'
import { MainButtonSide, ShowVariantList } from '@/shared/store/slice/userSlice'
import {
  getMainButtonSidesList,
  getShowVariantsList,
  normalizeMainButtonSide,
} from './data'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'
import InterfaceLanguageSwitch from '../InterfaceLanguageSwitch/InterfaceLanguageSwitch'

const Settings: FC = () => {
  const { t } = useTranslation()
  const { setShowVariantList, setMainButtonSide } = useActions()
  const { isAuth } = useAppSelector((store) => store.app)
  const savedShowVariant = useAppSelector((store) => store.user.showVariantList)
  const savedMainButtonSide = useAppSelector((store) => store.user.mainButtonSide)

  const [showVariantSelect, setShowVariantSelect] =
    useState<ShowVariantList | null>(null)
  const [mainButtonSideSelect, setMainButtonSideSelect] =
    useState<MainButtonSide | null>(null)

  const showVariantList = useMemo(() => {
    return getShowVariantsList(t)
  }, [t])

  const mainButtonSidesList = useMemo(() => {
    return getMainButtonSidesList(t)
  }, [t])

  const normalizedMainButtonSide = useMemo(() => {
    const normalizedValue = normalizeMainButtonSide(savedMainButtonSide)

    return (
      mainButtonSidesList.find((item) => item.value === normalizedValue) ||
      mainButtonSidesList[0] ||
      null
    )
  }, [mainButtonSidesList, savedMainButtonSide])

  const onSelectShowVariant = (v: ShowVariantList) => {
    if (isAuth) {
      setShowVariantList(v)
      setShowVariantSelect(v)
    }
  }

  const onSelectMainButtonSide = (v: MainButtonSide) => {
    if (isAuth) {
      setMainButtonSide(v)
      setMainButtonSideSelect(v)
    }
  }

  useEffect(() => {
    if (!showVariantSelect && isAuth) {
      setShowVariantSelect(savedShowVariant)
    }
  }, [showVariantSelect, isAuth, savedShowVariant])

  useEffect(() => {
    if (!mainButtonSideSelect && isAuth) {
      setMainButtonSideSelect(normalizedMainButtonSide)
    }
  }, [mainButtonSideSelect, isAuth, normalizedMainButtonSide])

  return (
    <View style={styles.container}>
      <ThemeSwitch />
      <InterfaceLanguageSwitch />

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
      <AppReviewButton />
    </View>
  )
}

export default Settings
