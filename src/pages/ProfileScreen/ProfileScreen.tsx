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
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'
import { isShowModalYearResult } from '@/shared/constants/app'
import { useActions } from '@/shared/hooks/useActions'

const ProfileScreen: FC = () => {
  const { setShowYearResult } = useActions()
  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalCards, setModalCards] = useState(false)

  const { items } = useAppSelector((store) => store.items)

  const showModalLogout = () => {
    setModalLogout(true)
  }

  const showModalDelete = () => {
    setModalDelete(true)
  }

  const onShowModalYearResult = () => {
    setShowYearResult(true)
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

        {!!Object.keys(items)?.length && (
          <Button
            classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
            onPress={startRepeat}
          >
            начать повторение
          </Button>
        )}

        {isShowModalYearResult && (
          <Button
            classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
            onPress={onShowModalYearResult}
          >
            Посмотреть итоги {new Date().getFullYear()} года 🎉
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
