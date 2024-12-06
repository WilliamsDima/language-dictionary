import { COLORS } from '@/assets/styles/colors'
import { StatusItem } from '@/entities/Item/model/item'

export type TabWord = {
  status: StatusItem
  label: string
  color: string
}

export const tabsWords: TabWord[] = [
  {
    status: 'ALL',
    label: 'Все',
    color: COLORS.white,
  },
  {
    status: 'STUDY',
    label: 'В изучении',
    color: COLORS.item_study,
  },
  {
    status: 'READY',
    label: 'Изучено',
    color: COLORS.item_ready,
  },
]
