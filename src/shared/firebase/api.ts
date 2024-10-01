import { deleteUser, getAuth } from 'firebase/auth'
import {
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
  DocumentData,
  getDoc,
} from 'firebase/firestore/lite'
import { IFirebaseData, IUser } from '../store/slice/userSlice'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../helpers/config/firebase'
import auth from '@react-native-firebase/auth'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const authFirebase = getAuth(app)
authFirebase.languageCode = 'ru'

export const getUserData = async (
  id: string
): Promise<DocumentData | undefined> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()
  return data
}

export const getAplicationData = async (): Promise<
  DocumentData | undefined
> => {
  try {
    const docRef = doc(db, 'app', 'info')
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    return data
  } catch (error) {
    console.log('getAplicationData error', error)
  }
}

export const logout = () => {
  return auth().signOut() // Выход пользователя
}

export const deleteProfile = (user: any) => {
  try {
    return deleteUser(user)
  } catch (error) {
    console.log('deleteProfile error', error)
  }
}

export const updateItemAPI = async (user: IUser, items: any[]) => {
  await updateDoc(doc(db, 'users', user.uid), {
    items: items,
  })
}

export const updateUserProfile = async (uid: string, data: IFirebaseData) => {
  const user = uid ? await getUserData(uid) : ''

  if (user) {
    return updateDoc(doc(db, 'users', uid), {
      ...data,
    })
  }
}

export const deleteUserAPI = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'users', id))
  } catch (error) {
    console.log('deleteUserAPI error', error)
  }
}
