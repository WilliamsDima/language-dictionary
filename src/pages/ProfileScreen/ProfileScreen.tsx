import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'

const ProfileScreen: FC = () => {
  const [modalLogout, setModalLogout] = useState(false)

  const showModalLogout = () => {
    setModalLogout(true)
  }

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <UserInfo />

        <Button
          classes={{ btn: styles.logout, textBtn: styles.logoutText }}
          onPress={showModalLogout}
        >
          выйти из аккаунта
        </Button>
      </View>

      <ModalLogout visible={modalLogout} setVisible={setModalLogout} />
    </Layout>
  )
}

export default ProfileScreen
