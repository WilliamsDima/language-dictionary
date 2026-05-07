import { IItem, StatusItem } from '@/entities/Item/model/item'
import { IFirebaseData } from '../store/slice/userSlice'
import { mockAppData, mockFirebaseData } from '../mock/appData'

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

export const getUserData = async (
  _id?: string
): Promise<IFirebaseData | undefined> => {
  return mockFirebaseData
}

export const getAplicationData = async () => {
  return mockAppData
}

export const getItems = async (_params: GetItemsParams) => {
  return {
    items: [] as IItem[],
    lastVisible: undefined,
    error: undefined,
  }
}

export const addItemAPI = async (_uid: string, newItem: IItem) => {
  return {
    ...newItem,
    idDoc: newItem.idDoc || Date.now().toString(),
    error: undefined,
  }
}

export const deleteItemAPI = async (_uid: string, idDoc: string) => {
  return { success: true, id: idDoc }
}

export const updateItemAPI = async (
  _uid: string,
  idDoc: string,
  updatedData: Partial<IItem>
) => {
  return { ...(updatedData as IItem), idDoc, error: undefined }
}

export const logout = async () => {}

export const deleteProfile = async (_user: unknown) => {}

export const updateUserProfile = async (
  _uid: string,
  data: Partial<IFirebaseData>
) => {
  return data
}

export const deleteAllItems = async (_uid: string) => {}
