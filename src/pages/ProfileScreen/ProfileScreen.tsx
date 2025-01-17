import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useState } from 'react'
import { View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '../SettingsScreen/api/userServices'
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'

const ProfileScreen: FC = () => {
  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalCards, setModalCards] = useState(false)

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
    setModalCards(true)
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

      <ModalCardsFilter visible={modalCards} setVisible={setModalCards} />
    </Layout>
  )
}

export default ProfileScreen
