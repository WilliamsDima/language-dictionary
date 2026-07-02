import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useActions } from './useActions'
import { useAppDispatch } from './useStore'
import { signInWithGoogle, signOutFirebase } from '../firebase/auth'
import { baseApi } from '../API/baseApi'
import { useGetMeQuery, useDeleteMeMutation } from '../API/services/me/MeQuery'
import { useGoogleSyncMutation } from '../API/services/auth/AuthQuery'
import { getAuthToken, clearAuthToken } from '../lib/authToken'

type IContext = {
  loginWithGoogle: () => Promise<void>
  logoutHandler: () => Promise<void>
  deleteAccaunt: () => Promise<void>
  isBootstrapping: boolean
}

const AuthContext = createContext<IContext>({} as IContext)

type AuthProviderType = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const { setIsAuth, clearLocalSettings } = useActions()

  const dispatch = useAppDispatch()

  const [deleteMe] = useDeleteMeMutation()
  const [googleSync] = useGoogleSyncMutation()

  const [bootstrapToken] = useState(() => getAuthToken())
  const [isBootstrapping, setIsBootstrapping] = useState(!!bootstrapToken)

  const {
    data: meProfile,
    isLoading: isMeLoading,
    isError: isMeError,
  } = useGetMeQuery(undefined, { skip: !bootstrapToken })

  useEffect(() => {
    if (!bootstrapToken) {
      setIsBootstrapping(false)
      return
    }

    if (isMeLoading) return

    if (isMeError) {
      clearAuthToken()
      setIsAuth(false)
    } else if (meProfile) {
      setIsAuth(true)
    }

    setIsBootstrapping(false)
  }, [bootstrapToken, isMeLoading, isMeError, meProfile, setIsAuth])

  const loginWithGoogle = useCallback(async () => {
    const idToken = await signInWithGoogle()

    await googleSync({ idToken }).unwrap()
    setIsAuth(true)
  }, [googleSync, setIsAuth])

  const logoutHandler = useCallback(async () => {
    try {
      await signOutFirebase()
    } catch (error) {
      console.log('error signOutFirebase: ', error)
    } finally {
      clearAuthToken()
      dispatch(baseApi.util.resetApiState())
      setIsAuth(false)
      clearLocalSettings()
    }
  }, [dispatch, clearLocalSettings, setIsAuth])

  const deleteAccaunt = useCallback(async () => {
    try {
      await deleteMe().unwrap()
    } finally {
      await logoutHandler()
    }
  }, [deleteMe, logoutHandler])

  const value = useMemo(() => {
    return {
      loginWithGoogle,
      logoutHandler,
      deleteAccaunt,
      isBootstrapping,
    }
  }, [loginWithGoogle, logoutHandler, deleteAccaunt, isBootstrapping])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
