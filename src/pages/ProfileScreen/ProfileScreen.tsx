import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useState } from 'react'
import { Alert, View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '../SettingsScreen/api/userServices'
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'
import { CardsProvider } from '../CardsRepetition/CardsContext'
import CodePush from 'react-native-code-push'

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

  const checkUpdate = () => {
    CodePush.checkForUpdate().then((update) => {
      if (update) {
        console.log('Обновление доступно:', update)
        Alert.alert('Новое обновление доступно!')
      } else {
        Alert.alert('Обновлений нет.')
        console.log('Обновлений нет.')
      }
    })
  }

  const clearUpdate = () => {
    CodePush.clearUpdates()
  }

  const startUpdate = () => {
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: {
        appendReleaseDescription: true,
        optionalUpdateMessage: 'Новое обновление доступно!',
        optionalIgnoreButtonLabel: 'Игнорировать',
        optionalInstallButtonLabel: 'Установить',
      },
    }).then((status) => {
      if (status === CodePush.SyncStatus.UPDATE_INSTALLED) {
        Alert.alert(
          'Обновление установлено',
          'Новое обновление успешно применено!'
        )
      }
    })
  }

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <UserInfo />

        <UserStatistic />

        {/* <Button classes={{ btn: styles.logout, textBtn: styles.logoutText }}>
          редактировать
        </Button> */}

        <Button
          classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
          onPress={startUpdate}
        >
          начать обновление 1111
        </Button>

        <Button
          classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
          onPress={checkUpdate}
        >
          проверить обновление
        </Button>

        <Button
          classes={{ btn: styles.repeatBtn, textBtn: styles.logoutText }}
          onPress={clearUpdate}
        >
          сбросить обновление
        </Button>

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
