import React, {
  FC,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { useActions } from './useActions'
import { useAppSelector } from './useStore'
import { IFirebaseData, IUser } from '../store/slice/userSlice'
import { deleteDoc, doc, setDoc } from 'firebase/firestore/lite'
import { db, deleteProfile, getUserData, logout } from '../firebase/api'

type IContext = {
  logoutHandler: () => Promise<void>
  deleteAccaunt: () => void
  user: IUser | null
  firebaseData: IFirebaseData | null
}

const AuthContext = createContext<IContext>({} as IContext)

type AuthProviderType = {
  children: ReactNode
}

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const { setIsAuth, setUser, setFirebaseData } = useActions()

  const { user, firebaseData } = useAppSelector((store) => store.user)

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User) => {
    console.log('onAuthStateChanged user', user)
    setIsAuth(!!user)
    setUser(user)

    const isUser = await getUserData(user.uid)

    const userData: IFirebaseData = {
      name: user.displayName || '',
      uid: isUser?.uid ? isUser.uid : user.uid,
      email: user?.email || '',
      dateRegistration: isUser?.dateRegistration
        ? isUser?.dateRegistration
        : +new Date(),
      showVariantList: isUser?.showVariantList,
      languages: isUser?.languages || [],
      native_language: isUser?.native_language || null,
    }

    await setDoc(doc(db, 'users', user.uid), userData)
    setFirebaseData(userData as any)
  }

  const logoutHandler = async () => {
    console.log('logoutHandler')
    try {
      await logout()
      setIsAuth(false)
      setUser(null)
    } catch (error: any) {
      if (error) console.log('error logout: ', error)
    } finally {
    }
  }

  const deleteAccaunt = async () => {
    if (user) {
      console.log('deleteAccaunt')

      await deleteUserAPI(user?.uid)
      await deleteProfile(user)

      logoutHandler()
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
      user,
      firebaseData,
    }
  }, [logoutHandler, deleteAccaunt, user, firebaseData])

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
