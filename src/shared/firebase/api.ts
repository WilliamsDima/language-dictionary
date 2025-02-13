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
  orderBy,
  query,
  limit,
  startAt,
  startAfter,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore/lite'
import { IFirebaseData } from '../store/slice/userSlice'
import { initializeApp } from 'firebase/app'
import auth from '@react-native-firebase/auth'
import { IItem, StatusItem } from '@/entities/Item/model/item'
import { firebaseConfig } from '../helpers/config/firebase'

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const authFirebase = getAuth(app)
authFirebase.languageCode = 'ru'

export const getUserData = async (
  id?: string
): Promise<DocumentData | undefined> => {
  if (!id) return
  //console.log('getUserData id', id)

  // console.log('getUserData')

  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  const data = docSnap.data()

  //console.log('getUserData data', data)
  return data
}

export const getAplicationData = async (): Promise<
  DocumentData | undefined
> => {
  // console.log('getAplicationData')
  try {
    const docRef = doc(db, 'app', 'info')
    const docSnap = await getDoc(docRef)
    const data = docSnap.data()
    return data
  } catch (error) {
    console.log('getAplicationData error', error)
  }
}

export type FilterMain = {
  sortDate?: 'asc' | 'desc'
  languages?: number[]
}

export type FilterItems = {
  status?: StatusItem
  search?: string
  filter?: FilterMain
}

export type GetItemsParams = {
  uid?: string
  filter?: FilterItems
  page?: number
  limitCount?: number
  lastVisible?: QueryDocumentSnapshot<DocumentData, DocumentData>
}

// 'asc' — сортировка по возрастанию.
// 'desc' — сортировка по убыванию.

export const getItems = async ({
  filter,
  limitCount,
  page,
  uid,
  lastVisible,
}: GetItemsParams) => {
  // console.log('getItems filter', filter)

  try {
    if (uid) {
      const items: IItem[] = []
      const itemsRef = collection(db, 'users', uid, 'items')

      // Создаем массив условий для фильтрации
      const filters = []
      if (filter?.status && filter.status !== 'ALL') {
        filters.push(where('status', '==', filter.status))
      }

      // Фильтрация по языкам, если указаны
      if (filter?.filter?.languages && filter?.filter.languages?.length > 0) {
        const languageIds = filter.filter.languages.map((lang) => lang)
        filters.push(where('language.id', 'in', languageIds))
      }

      // Добавляем сортировку по дате, если задано sortOrder
      if (filter?.filter?.sortDate) {
        filters.push(orderBy('date', filter.filter.sortDate))
      }

      // Выполняем запрос к базе данных с фильтрами, если они есть
      let queryRef = filters.length > 0 ? query(itemsRef, ...filters) : itemsRef

      // применяем пагинацию только если не используется поиск
      if (page && page > 1 && lastVisible && !filter?.search) {
        queryRef = query(queryRef, startAfter(lastVisible)) // Загружаем после lastVisible
      }

      // применяем лимит только если не используется поиск
      if (limitCount && !filter?.search) {
        queryRef = query(queryRef, limit(limitCount))
      }

      const querySnapshot = await getDocs(queryRef)

      // Проверяем, есть ли еще данные для следующей страницы
      const newLastVisibleDoc =
        querySnapshot.docs[querySnapshot.docs.length - 1]

      querySnapshot?.docs?.forEach((doc) => {
        const itemData = doc.data() as IItem
        const { items: itemArray } = itemData

        // Убедимся, что description есть, иначе присвоим пустую строку
        const description = itemData.description?.toLowerCase() || ''

        if (filter?.search) {
          const searchTerm = filter.search.toLowerCase()

          let filteredItems = itemArray.filter((subItem) => {
            const word = subItem.word?.toLowerCase() || ''
            const translate = subItem.translate?.toLowerCase() || ''

            return (
              word.includes(searchTerm) ||
              translate.includes(searchTerm) ||
              description.includes(searchTerm)
            )
          })

          if (filteredItems.length > 0) {
            items.push({
              idDoc: doc.id,
              ...itemData,
              items: filteredItems, // Оставляем только найденные элементы
            })
          }
        } else {
          items.push({
            idDoc: doc.id,
            ...itemData,
          })
        }
      })

      return {
        items,
        lastVisible: newLastVisibleDoc, // Возвращаем последний элемент для следующей страницы
      }
    }
  } catch (error) {
    console.log('Error getUserItems', error)
    return {
      error: `Error getUserItems: ${JSON.stringify(error)}`,
    }
  }
}

export const addItemAPI = async (uid: string, newItem: IItem) => {
  // console.log('addItemAPI')
  try {
    // Создаем ссылку на коллекцию items для данного пользователя
    const itemsRef = collection(db, 'users', uid, 'items')

    // Добавляем новый элемент в коллекцию
    const docRef = await addDoc(itemsRef, newItem)

    // Получаем сам документ с его данными
    const docSnap = await getDoc(doc(db, 'users', uid, 'items', docRef.id))

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data(), idDoc: docRef.id }
    }

    return undefined
  } catch (error) {
    console.log('Error adding items:', error)
    return {
      error: `Error adding items: ${JSON.stringify(error)}`,
    }
  }
}

// Функция для удаления элемента из коллекции items
export const deleteItemAPI = async (uid: string, idDoc: string) => {
  // console.log('deleteItemAPI')
  try {
    // Создаем ссылку на документ с данным itemId
    const itemRef = doc(db, 'users', uid, 'items', idDoc)

    // Удаляем документ
    await deleteDoc(itemRef)

    return { success: true, id: idDoc }
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
  // console.log('updateItemAPI')
  try {
    const itemRef = doc(db, 'users', uid, 'items', idDoc)

    // Обновляем документ
    await updateDoc(itemRef, updatedData)

    // Получаем обновленный документ
    const docSnap = await getDoc(itemRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data(), idDoc: itemRef.id }
    }
  } catch (error) {
    console.log('Error updating item:', error)
  }
}

export const logout = () => {
  console.log('logout')
  return auth().signOut() // Выход пользователя
}

export const deleteProfile = (user: any) => {
  console.log('deleteProfile')
  try {
    return deleteUser(user)
  } catch (error) {
    console.log('deleteProfile error', error)
  }
}

export const updateUserProfile = async (
  uid: string,
  data: Partial<IFirebaseData>
) => {
  // console.log('updateUserProfile')

  const user = uid ? await getUserData(uid) : ''

  if (user) {
    console.log('updateUserProfile')
    return updateDoc(doc(db, 'users', uid), data)
  }
}

export const deleteAllItems = async (uid: string) => {
  // console.log('deleteAllItems')
  try {
    // Получаем ссылку на коллекцию 'items' для пользователя
    const itemsRef = collection(db, 'users', uid, 'items')

    // Получаем все документы из коллекции
    const querySnapshot = await getDocs(itemsRef)

    // Создаем массив промисов для удаления каждого документа
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref))

    // Выполняем все операции удаления
    await Promise.all(deletePromises)

    console.log('Все документы из коллекции items удалены.')
  } catch (error) {
    console.error('Ошибка при удалении документов из коллекции items:', error)
  }
}
