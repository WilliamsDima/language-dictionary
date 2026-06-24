import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo, useState, useCallback } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppSelector } from '@/shared/hooks/useStore'
import { isShowModalYearResult } from '@/shared/constants/app'
import { useActions } from '@/shared/hooks/useActions'
import { useGetItems } from '@/shared/hooks/useGetItems'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import ProfileMetaCard from './UI/ProfileMetaCard/ProfileMetaCard'
import ProfileAchievements from './UI/ProfileAchievements/ProfileAchievements'
import ProfileActions from './UI/ProfileActions/ProfileActions'

const ProfileScreen: FC = () => {
  const { navigate } = useAppNavigation()
  const { setShowYearResult } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)

  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  useGetItems()

  const registrationDate = useMemo(() => {
    return dateFormat({ date: firebaseData?.dateRegistration, type: 'FULL' })
  }, [firebaseData?.dateRegistration])

  const showModalLogout = useCallback(() => {
    setModalLogout(true)
  }, [])

  const showModalDelete = useCallback(() => {
    setModalDelete(true)
  }, [])

  const onShowModalYearResult = useCallback(() => {
    setShowYearResult(true)
  }, [setShowYearResult])

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
          isShowYearResult={isShowModalYearResult}
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
