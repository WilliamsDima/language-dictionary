import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import VKLogin from 'react-native-vkontakte-login'
import { useActions } from './useActions'
import { useAppDispatch, useAppSelector } from './useStore'
import { IFirebaseData, IUserActivity } from '../store/slice/userSlice'
import { deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import {
  db,
  deleteAllItems,
  deleteProfile,
  getUserData,
  logout,
} from '../firebase/api'
import { baseApi } from '../API/baseApi'
import { removeAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'
import { useUserVk } from '../API/getUserVk'

type IContext = {
  logoutHandler: () => Promise<void>
  deleteAccaunt: () => void
  firebaseData: IFirebaseData | null
}

const AuthContext = createContext<IContext>({} as IContext)

type AuthProviderType = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const { setIsAuth, setFirebaseData, setIsVkLogin } = useActions()

  const dispatch = useAppDispatch()

  const { firebaseData, isVkLogin } = useAppSelector((store) => store.user)
  const { aplication } = useAppSelector((store) => store.app)

  useUserVk()

  const onAuthStateChanged = useCallback(
    async (user?: FirebaseAuthTypes.User) => {
      // console.log('onAuthStateChanged user', user)
      if (!user) return

      setIsAuth(!!user)

      const isUser = await getUserData(user.uid)

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
        name: user.displayName || '',
        uid: isUser?.uid ? isUser.uid : user.uid,
        email: user?.email || '',
        dateRegistration: isUser?.dateRegistration
          ? isUser?.dateRegistration
          : +new Date(),
        showVariantList:
          isUser?.showVariantList || aplication?.showVariantsList?.[1] || null,
        languages: isUser?.languages || [],
        native_language: isUser?.native_language || null,
        image: user.photoURL || '',
        activity,
      }

      await setDoc(doc(db, 'users', user.uid), userData)
      setFirebaseData(userData as any)
    },
    [aplication?.showVariantsList, setFirebaseData, setIsAuth]
  )

  const logoutVk = useCallback(async () => {
    console.log('logoutVk')

    setIsVkLogin(false)
    await removeAsyncLocal(LOCAL_KEYS.vk_token)
    await removeAsyncLocal(LOCAL_KEYS.vk_id_user)
    return VKLogin.logout()
  }, [setIsVkLogin])

  const logoutHandler = useCallback(async () => {
    console.log('logoutHandler')

    try {
      dispatch(baseApi.util.resetApiState())

      if (isVkLogin) {
        await logoutVk()
      } else {
        await logout()
      }

      setIsAuth(false)
      setFirebaseData(null)
    } catch (error: any) {
      if (error) console.log('error logout: ', error)
    } finally {
    }
  }, [dispatch, isVkLogin, logoutVk, setFirebaseData, setIsAuth])

  const deleteAccaunt = useCallback(async () => {
    if (firebaseData) {
      console.log('deleteAccaunt')

      deleteUserAPI(firebaseData?.uid.toString())

      if (isVkLogin) {
        await deleteAllItems(firebaseData?.uid.toString())
      }

      if (!isVkLogin) {
        await deleteProfile(firebaseData)
      }

      setTimeout(() => {
        logoutHandler()
      }, 500)
    }
  }, [firebaseData, isVkLogin, logoutHandler])

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged as any)
    return subscriber // unsubscribe on unmount
  }, [onAuthStateChanged])

  const value = useMemo(() => {
    return {
      logoutHandler,
      deleteAccaunt,
      firebaseData,
    }
  }, [logoutHandler, deleteAccaunt, firebaseData])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export const deleteUserAPI = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'users', id))
  } catch (error) {
    console.log('deleteUserAPI error', error)
  }
}
