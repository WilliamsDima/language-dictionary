import React, { FC } from 'react'
import { styles } from './ButtonVk.styles'
import Button from '@/shared/UI/Button/Button'
import VkIcon from '@/assets/icons/UI/vk-64.svg'
import Text from '@/shared/UI/Text/Text'
import { View } from 'react-native'
import VKLogin from 'react-native-vkontakte-login'
import { useActions } from '@/shared/hooks/useActions'
import { setAsyncLocal } from '@/shared/helpers/asyncStorage'
import { LOCAL_KEYS } from '@/shared/constants/localStorage'
import { IFirebaseData, IUserActivity } from '@/shared/store/slice/userSlice'
import { db, getUserData } from '@/shared/firebase/api'
import { doc, setDoc } from 'firebase/firestore/lite'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useUserVk } from '@/shared/API/getUserVk'

interface Props {}

const ButtonVk: FC<Props> = () => {
  const { setFirebaseData, setIsVkLogin, setIsAuth } = useActions()
  const { aplication } = useAppSelector((store) => store.app)

  const { getUserVk } = useUserVk()

  const handleVKLogin = async () => {
    // await VKLogin.logout()

    // return

    const auth = await VKLogin.login(['email'])

    // Запрос на получение данных пользователя
    const data = await getUserVk()

    if (data && Array.isArray(data.response) && data.response?.length) {
      const user = data.response[0]

      if (!user) {
        console.log('Ошибка пользователь Vk не неайден', data)

        return
      }

      const isUser = await getUserData(user.id.toString())

      console.log('isUser', isUser)

      let activity: IUserActivity | undefined = isUser?.activity

      // активностей ещё не было
      if (!activity) {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()

        activity = {
          year: {
            [year]: {
              [month]: {
                activeDays: [],
                addedCards: 0,
                openApp: 0,
                repeatCard: 0,
                startTraningCards: 0,
                studiedCard: 0,
                totalTimeSpent: 0,
                viewedAds: 0,
              },
            },
          },
        }
      }

      const userData: IFirebaseData = {
        name: user?.first_name + ' ' + user?.last_name,
        uid: user.id.toString(),
        email: user?.email || '',
        dateRegistration: isUser?.dateRegistration
          ? isUser?.dateRegistration
          : +new Date(),
        showVariantList:
          isUser?.showVariantList || aplication?.showVariantsList?.[1] || null,
        languages: isUser?.languages || [],
        native_language: isUser?.native_language || null,
        image: user.photo_200 || '',
        activity,
      }

      await setDoc(doc(db, 'users', user.id.toString()), userData)

      console.log('vk login')

      setFirebaseData(userData as any)
      setIsVkLogin(true)
      setIsAuth(true)

      // auth.token - Токен доступа
      // auth.user_id - ID пользователя
      // auth.email - Email пользователя, если доступен
      // Сохранение токена и ID пользователя
      await setAsyncLocal(LOCAL_KEYS.vk_token, auth.access_token)
      await setAsyncLocal(LOCAL_KEYS.vk_id_user, auth?.user_id?.toString())
    }
  }

  return (
    <>
      <Button
        classes={{ btn: styles.btn }}
        isText={false}
        onPress={handleVKLogin}
      >
        <View style={styles.content}>
          <Text style={styles.text}>Войти с помощью ВКонтакте</Text>
          <VkIcon width={24} height={24} />
        </View>
      </Button>
    </>
  )
}

export default ButtonVk
