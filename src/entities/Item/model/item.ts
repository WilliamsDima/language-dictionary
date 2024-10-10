import { AddItemWords } from '@/features/ModalAddItem/Model/items'
import { ILanguage } from '@/shared/json/languages'

export type StatusItem = 'READY' | 'STUDY' | 'ALL'

export interface IItem {
  id: number
  idDoc?: string
  date: Date
  description: string
  language: ILanguage
  items: AddItemWords[]
  status: StatusItem
}
