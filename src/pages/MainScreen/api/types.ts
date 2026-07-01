import { IItem, StatusItem } from '@/entities/Item/model/item'
import { FilterMain } from '@/shared/store/slice/itemsSlice'

export type CardStatus = 'READY' | 'STUDY'

export type CardItemDTO = {
  id: number
  word: string
  translate: string
  date: string
}

export type CardDTO = {
  id: number
  user_id: number
  language: string
  description?: string
  status: CardStatus
  items: CardItemDTO[] | null
  date: string
  updated_at: string
}

export type GetCardsResponseDTO = {
  items: CardDTO[]
  total: number
  limit: number
  offset: number
}

export type FilterItems = {
  status?: StatusItem
  search?: string
  filter?: FilterMain
}

export type GetItemsParams = {
  filter?: FilterItems
  page?: number
  limitCount?: number
  lastVisible?: unknown
}

export type GetItemsRequest = {
  items: IItem[]
  total: number
  lastVisible?: unknown
}

export type AddItemParams = {
  item: IItem
}

export type UpdateItemParams = {
  idDoc: string
  updatedData: Partial<IItem>
}

export type DeleteItemParams = {
  idDoc: string
}

export type UpdateItemStatusParams = {
  idDoc: string
  status: CardStatus
}
