import { CardStatus, IItem, StatusItem } from '@/entities/Item/model/item'
import { FilterMain } from '@/shared/store/slice/itemsSlice'

export type { CardStatus }

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
  has_more: boolean
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
  // запросить сразу весь список карточек пользователя одним ответом
  // (без limit/offset) — см. `all` в CardsService.list
  all?: boolean
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
  id: number
  updatedData: Partial<IItem>
}

export type DeleteItemParams = {
  id: number
}

export type UpdateItemStatusParams = {
  id: number
  status: CardStatus
}
