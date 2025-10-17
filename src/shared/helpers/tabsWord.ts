import { COLORS } from '@/assets/styles/colors'
import type { StatusItem } from '@/entities/Item/model/item'
import type { I18t } from '../i18n/types'

export type TabWord = {
  status: StatusItem
  label: string
  color: string
}

export const tabsWords: (t: I18t) => TabWord[] = (t) => [
  {
    status: 'ALL',
    label: t('ui.all'),
    color: COLORS.white,
  },
  {
    status: 'STUDY',
    label: t('ui.in_study'),
    color: COLORS.item_study,
  },
  {
    status: 'READY',
    label: t('ui.study'),
    color: COLORS.item_ready,
  },
]
