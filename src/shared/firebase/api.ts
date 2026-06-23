import { IItem, StatusItem } from '@/entities/Item/model/item'
import { IFirebaseData } from '../store/slice/userSlice'
import { mockAppData, mockFirebaseData } from '../mock/appData'
import { mockItemsSeed } from '../mock/items'

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

let mockItemsDb = [...mockItemsSeed]

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getItems = async (_params: GetItemsParams) => {
  await wait(900)

  const { filter, limitCount = 10, page = 1 } = _params
  const normalizedSearch = filter?.search?.trim().toLowerCase()

  let result = [...mockItemsDb]

  if (filter?.status && filter.status !== 'ALL') {
    result = result.filter((item) => item.status === filter.status)
  }

  if (filter?.filter?.languages?.length) {
    result = result.filter((item) =>
      filter.filter?.languages?.includes(item.language.short_name)
    )
  }

  if (normalizedSearch) {
    result = result.filter((item) => {
      const haystack = [
        item.description,
        item.language.full_name,
        ...item.items.flatMap((word) => [word.word, word.translate]),
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedSearch)
    })
  }

  result.sort((left, right) => {
    const leftTime = new Date(left.date).getTime()
    const rightTime = new Date(right.date).getTime()

    return filter?.filter?.sortDate === 'asc'
      ? leftTime - rightTime
      : rightTime - leftTime
  })

  const startIndex = Math.max(0, (page - 1) * limitCount)
  const paginatedItems = result.slice(startIndex, startIndex + limitCount)
  const hasMore = startIndex + limitCount < result.length

  return {
    items: paginatedItems,
    lastVisible: hasMore ? startIndex + limitCount : undefined,
    error: undefined,
  }
}

export const addItemAPI = async (_uid: string, newItem: IItem) => {
  await wait(400)

  const item = {
    ...newItem,
    idDoc: newItem.idDoc || Date.now().toString(),
    error: undefined,
  }

  mockItemsDb = [item, ...mockItemsDb]

  return item
}

export const deleteItemAPI = async (_uid: string, idDoc: string) => {
  await wait(300)
  mockItemsDb = mockItemsDb.filter((item) => item.idDoc !== idDoc)
  return { success: true, id: idDoc }
}

export const updateItemAPI = async (
  _uid: string,
  idDoc: string,
  updatedData: Partial<IItem>
) => {
  await wait(350)

  const currentItem = mockItemsDb.find((item) => item.idDoc === idDoc)
  const nextItem = {
    ...(currentItem as IItem),
    ...(updatedData as IItem),
    idDoc,
    error: undefined,
  }

  mockItemsDb = mockItemsDb.map((item) => (item.idDoc === idDoc ? nextItem : item))

  return nextItem
}

export const logout = async () => {}

export const deleteProfile = async (_user: unknown) => {}

export const updateUserProfile = async (
  _uid: string,
  data: Partial<IFirebaseData>
) => {
  Object.assign(mockFirebaseData, data)

  return mockFirebaseData
}

export const deleteAllItems = async (_uid: string) => {}
