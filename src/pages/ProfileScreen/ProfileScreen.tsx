import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo, useState, useCallback } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useMeProfile } from '@/shared/hooks/useMeProfile'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import ProfileMetaCard from './UI/ProfileMetaCard/ProfileMetaCard'
import ProfileAchievements from './UI/ProfileAchievements/ProfileAchievements'
import ProfileActions from './UI/ProfileActions/ProfileActions'
import { useYearInReviewGate } from './hooks/useYearInReviewGate'

const ProfileScreen: FC = () => {
  const { navigate } = useAppNavigation()
  const { data: profile } = useMeProfile()
  const { isAvailable: isShowYearResult, showManually: onShowModalYearResult } =
    useYearInReviewGate()

  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const registrationDate = useMemo(() => {
    return dateFormat({ date: profile?.dateRegistration, type: 'FULL' })
  }, [profile?.dateRegistration])

  const showModalLogout = useCallback(() => {
    setModalLogout(true)
  }, [])

  const showModalDelete = useCallback(() => {
    setModalDelete(true)
  }, [])

  const openAchievements = useCallback(() => {
    navigate(RoutesNames.achievements)
  }, [navigate])

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <ProfileMetaCard registrationDate={registrationDate} />

        <UserStatistic />

        <ProfileAchievements onPress={openAchievements} />

        <ProfileActions
          isShowYearResult={isShowYearResult}
          onShowYearResult={onShowModalYearResult}
          onLogout={showModalLogout}
          onDeleteAccount={showModalDelete}
        />
      </View>
      <ModalDeleteAccaunt visible={modalDelete} setVisible={setModalDelete} />
      <ModalLogout visible={modalLogout} setVisible={setModalLogout} />
    </Layout>
  )
}

export default ProfileScreen
