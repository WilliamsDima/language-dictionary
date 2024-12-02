import VKLogin from 'react-native-vkontakte-login'
import { getUserData } from '../firebase/api'
import { useActions } from '../hooks/useActions'
import { useEffect } from 'react'

export const useUserVk = () => {
  const { setIsAuth, setFirebaseData, setIsVkLogin } = useActions()

  const getUserVk = async () => {
    console.log('getUserVk')

    try {
      const auth = await VKLogin.login(['email'])

      // Запрос на получение данных пользователя
      const response = await fetch(
        `https://api.vk.com/method/users.get?user_ids=${auth.user_id}&fields=photo_200,first_name,last_name&access_token=${auth.access_token}&v=5.131`
      )

      const data = await response.json()

      if (data && Array.isArray(data.response) && data.response?.length) {
        const user = data.response[0]
        const isUser = await getUserData(user.id.toString())

        if (isUser) {
          setIsAuth(true)
          setFirebaseData(isUser as any)
          setIsVkLogin(true)
        }
      }

      return data
    } catch (error) {
      console.log('getUserVk error', error)
    }
  }

  useEffect(() => {
    ;(async () => {
      const isLoggedIn = await VKLogin.isLoggedIn()

      if (isLoggedIn) getUserVk()
    })()
  }, [])

  return { getUserVk }
}
