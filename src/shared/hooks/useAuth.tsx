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
import auth from '@react-native-firebase/auth'
import { useActions } from './useActions'
import { useAppDispatch } from './useStore'
import { signInWithGoogle, signOutFirebase } from '../firebase/auth'
import { baseApi } from '../API/baseApi'
import { useGetMeQuery, useDeleteMeMutation } from '../API/services/me/MeQuery'
import { useGoogleSyncMutation } from '../API/services/auth/AuthQuery'

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

  // Firebase persists the signed-in session natively; onAuthStateChanged
  // fires once at startup with the restored user (or null) once that
  // session has been resolved — that's the real signal for "was previously
  // logged in", not a token cached in storage (which would go stale).
  const [hasFirebaseSession, setHasFirebaseSession] = useState<boolean | null>(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  const {
    data: meProfile,
    isLoading: isMeLoading,
    isError: isMeError,
  } = useGetMeQuery(undefined, { skip: !hasFirebaseSession })

  useEffect(() => {
    return auth().onAuthStateChanged((user) => {
      setHasFirebaseSession(!!user)
    })
  }, [])

  useEffect(() => {
    if (hasFirebaseSession === null) return

    if (!hasFirebaseSession) {
      setIsBootstrapping(false)
      return
    }

    if (isMeLoading) return

    if (isMeError) {
      setIsAuth(false)
    } else if (meProfile) {
      setIsAuth(true)
    }

    setIsBootstrapping(false)
  }, [hasFirebaseSession, isMeLoading, isMeError, meProfile, setIsAuth])

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
