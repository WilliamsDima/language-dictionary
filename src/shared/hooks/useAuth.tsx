import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import VKLogin from 'react-native-vkontakte-login'
import { useActions } from './useActions'
import { useAppDispatch, useAppSelector } from './useStore'
import { IFirebaseData } from '../store/slice/userSlice'
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

  const onAuthStateChanged = async (user?: FirebaseAuthTypes.User) => {
    if (!user) return

    console.log('onAuthStateChanged user', user)
    setIsAuth(!!user)

    const isUser = await getUserData(user.uid)

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
    }

    await setDoc(doc(db, 'users', user.uid), userData)
    setFirebaseData(userData as any)
  }

  const logoutVk = async () => {
    setIsVkLogin(false)
    await removeAsyncLocal(LOCAL_KEYS.vk_token)
    await removeAsyncLocal(LOCAL_KEYS.vk_id_user)
    return VKLogin.logout()
  }

  const logoutHandler = async () => {
    try {
      dispatch(baseApi.util.resetApiState())

      if (!isVkLogin) {
        await logout()
      }

      await logoutVk()
      setIsAuth(false)
      setFirebaseData(null)
    } catch (error: any) {
      if (error) console.log('error logout: ', error)
    } finally {
    }
  }

  const deleteAccaunt = async () => {
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
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged as any)
    return subscriber // unsubscribe on unmount
  }, [])

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
