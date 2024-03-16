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
import { doc, setDoc } from 'firebase/firestore/lite'
import { db, getUserData, logout } from '../firebase/api'

type IContext = {
  logoutHandler: () => Promise<void>
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

    const userData = {
      name: user.displayName,
      items: isUser?.items ? isUser?.items : [],
      uid: isUser?.uid ? isUser.uid : user.uid,
      dateRegistration: isUser?.dateRegistration
        ? isUser?.dateRegistration
        : +new Date(),
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

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged as any)
    return subscriber // unsubscribe on unmount
  }, [])

  const value = useMemo(() => {
    return {
      logoutHandler,
      user,
      firebaseData,
    }
  }, [logoutHandler, user, firebaseData])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
