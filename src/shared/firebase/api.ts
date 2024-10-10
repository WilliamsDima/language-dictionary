import { deleteUser, getAuth } from 'firebase/auth'
import {
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
  DocumentData,
  getDoc,
  collection,
  getDocs,
  addDoc,
  where,
  query,
  CollectionReference,
  Query,
} from 'firebase/firestore/lite'
import { IFirebaseData, IUser } from '../store/slice/userSlice'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../helpers/config/firebase'
import auth from '@react-native-firebase/auth'
import { IItem, StatusItem } from '@/entities/Item/model/item'

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

export type FilterItems = {
  status?: StatusItem
  search?: string
}

export const getItems = async (uid: string, filter?: FilterItems) => {
  try {
    if (uid) {
      const items: IItem[] = []
      const itemsRef = collection(db, 'users', uid, 'items')

      // Создаем массив условий для фильтрации
      const filters = []
      if (filter?.status && filter.status !== 'ALL') {
        filters.push(where('status', '==', filter.status))
      }

      // Выполняем запрос к базе данных с фильтрами, если они есть
      const ref = filters.length > 0 ? query(itemsRef, ...filters) : itemsRef

      const querySnapshot = await getDocs(ref)

      querySnapshot.forEach((doc) => {
        const itemData = doc.data() as IItem
        const { items: itemArray } = itemData

        // Если поиск включен, фильтруем элементы по полям word и translate
        if (filter?.search) {
          const searchTerm = filter.search.toLowerCase()
          const filteredItems = itemArray.filter(
            (subItem) =>
              subItem.word.toLowerCase().includes(searchTerm) ||
              subItem.translate.toLowerCase().includes(searchTerm)
          )

          // Если есть совпадения, добавляем элемент с отфильтрованными данными
          if (filteredItems.length > 0) {
            items.push({
              idDoc: doc.id,
              ...itemData,
              items: filteredItems, // Обновляем items только совпадающими элементами
            })
          }
        } else {
          // Если поиска нет, добавляем элемент как есть
          items.push({
            idDoc: doc.id,
            ...itemData,
          })
        }
      })

      return items
    }
  } catch (error) {
    console.log('getUserItems error', error)
  }
}

export const addItemAPI = async (uid: string, newItem: IItem) => {
  try {
    // Создаем ссылку на коллекцию items для данного пользователя
    const itemsRef = collection(db, 'users', uid, 'items')

    // Добавляем новый элемент в коллекцию
    const docRef = await addDoc(itemsRef, newItem)

    return docRef
  } catch (error) {
    console.log('Error updating user profile or adding items:', error)
  }
}

// Функция для удаления элемента из коллекции items
export const deleteItemAPI = async (uid: string, idDoc: string) => {
  try {
    // Создаем ссылку на документ с данным itemId
    const itemRef = doc(db, 'users', uid, 'items', idDoc)

    // Удаляем документ
    return deleteDoc(itemRef)
  } catch (error) {
    console.log('Error deleting item:', error)
  }
}

// Функция для обновления элемента в коллекции items
export const updateItemAPI = async (
  uid: string,
  idDoc: string,
  updatedData: Partial<IItem>
) => {
  try {
    const itemRef = doc(db, 'users', uid, 'items', idDoc) // Получаем ссылку на документ
    return updateDoc(itemRef, updatedData) // Обновляем документ
  } catch (error) {
    console.log('Error updating item:', error)
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

export const updateUserProfile = async (uid: string, data: IFirebaseData) => {
  const user = uid ? await getUserData(uid) : ''

  if (user) {
    return updateDoc(doc(db, 'users', uid), {
      ...data,
    })
  }
}
