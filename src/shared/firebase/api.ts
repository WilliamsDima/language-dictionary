import { IItem, StatusItem } from '@/entities/Item/model/item'
import { IFirebaseData } from '../store/slice/userSlice'

export type FilterMain = {
  sortDate?: 'asc' | 'desc'
  languages?: string[]
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
  lastVisible?: unknown
}

// TODO: wire up to the real API once the backend is connected
export const getUserData = async (
  _id?: string
): Promise<IFirebaseData | undefined> => {
  return undefined
}

// TODO: wire up to the real API once the backend is connected
export const getItems = async (_params: GetItemsParams) => {
  return {
    items: [] as IItem[],
    lastVisible: undefined as unknown,
    error: undefined,
  }
}

// TODO: wire up to the real API once the backend is connected
export const addItemAPI = async (_uid: string, newItem: IItem) => {
  return {
    ...newItem,
    idDoc: newItem.idDoc || Date.now().toString(),
    error: undefined,
  }
}

// TODO: wire up to the real API once the backend is connected
export const deleteItemAPI = async (_uid: string, idDoc: string) => {
  return { success: true, id: idDoc }
}

// TODO: wire up to the real API once the backend is connected
export const updateItemAPI = async (
  _uid: string,
  idDoc: string,
  updatedData: Partial<IItem>
) => {
  return {
    ...updatedData,
    idDoc,
    error: undefined,
  } as IItem
}

export const logout = async () => {}

export const deleteProfile = async (_user: unknown) => {}

// TODO: wire up to the real API once the backend is connected
export const updateUserProfile = async (
  _uid: string,
  data: Partial<IFirebaseData>
) => {
  return data as IFirebaseData
}

export const deleteAllItems = async (_uid: string) => {}
