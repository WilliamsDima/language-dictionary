import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '../SettingsScreen/api/userServices'

const ProfileScreen: FC = () => {
  const { navigate } = useAppNavigation()

  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const { firebaseData } = useAppSelector((store) => store.user)

  const { data: cards } = useGetItemsQuery(
    {
      uid: firebaseData?.uid,
    },
    { skip: !firebaseData?.uid }
  )

  const showModalLogout = () => {
    setModalLogout(true)
  }

  const showModalDelete = () => {
    setModalDelete(true)
  }

  const startRepeat = () => {
    navigate(RoutesNames.cardsRepetition)
  }

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <UserInfo />

        <UserStatistic />

        {/* <Button classes={{ btn: styles.logout, textBtn: styles.logoutText }}>
          редактировать
        </Button> */}

        {!!cards?.length && (
          <Button
            classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
            onPress={startRepeat}
          >
            начать повторение
          </Button>
        )}

        <Button
          classes={{ btn: styles.logout, textBtn: styles.logoutText }}
          onPress={showModalLogout}
        >
          выйти из аккаунта
        </Button>

        <Button
          classes={{ btn: styles.delete, textBtn: styles.logoutText }}
          onPress={showModalDelete}
          type="BORDER-TRANSPARENT"
        >
          удалить аккаунт
        </Button>
      </View>

      <ModalDeleteAccaunt visible={modalDelete} setVisible={setModalDelete} />

      <ModalLogout visible={modalLogout} setVisible={setModalLogout} />
    </Layout>
  )
}

export default ProfileScreen
