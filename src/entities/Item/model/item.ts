import { AddItemWords } from '@/features/ModalAddItem/Model/items'

// статус карточки как его отдаёт бэкенд
export type CardStatus = 'READY' | 'STUDY'

// статус для фильтров списка/практики — расширяет CardStatus значением "все"
export type StatusItem = CardStatus | 'ALL'

export interface IItem {
  id: number
  date: string
  description: string
  language: string
  items: AddItemWords[]
  status: CardStatus
}
