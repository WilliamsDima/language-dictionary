import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'

const ProfileScreen: FC = () => {
  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const showModalLogout = () => {
    setModalLogout(true)
  }

  const showModalDelete = () => {
    setModalDelete(true)
  }

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <UserInfo />

        <UserStatistic />

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
