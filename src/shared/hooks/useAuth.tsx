import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from 'react'
import { useActions } from './useActions'
import { useAppDispatch, useAppSelector } from './useStore'
import { IFirebaseData } from '../store/slice/userSlice'
import { deleteAllItems, deleteProfile, logout } from '../firebase/api'
import { baseApi } from '../API/baseApi'
import { removeAsyncLocal } from '../helpers/asyncStorage'
import { LOCAL_KEYS } from '../constants/localStorage'

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

  const logoutVk = useCallback(async () => {
    console.log('logoutVk')

    setIsVkLogin(false)
    await removeAsyncLocal(LOCAL_KEYS.vk_token)
    await removeAsyncLocal(LOCAL_KEYS.vk_id_user)
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
  console.log('deleteUserAPI skipped without Firebase', id)
}
