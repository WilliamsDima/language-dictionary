import { deleteUser, getAuth } from 'firebase/auth'
import {
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
  DocumentData,
  getDoc,
} from 'firebase/firestore/lite'
import { IUser } from '../store/slice/userSlice'
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

export const logout = () => {
  return auth().signOut() // Выход пользователя
}

export const deleteProfile = (user: any) => {
  return deleteUser(user)
}

export const updateItemAPI = async (user: IUser, items: any[]) => {
  await updateDoc(doc(db, 'users', user.uid), {
    items: items,
  })
}

export const deleteUserAPI = async (id: string) => {
  await deleteDoc(doc(db, 'users', id))
}
