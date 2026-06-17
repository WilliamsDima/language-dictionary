import type { StatusItem } from '@/entities/Item/model/item'
import type { I18t } from '../i18n/types'
import type { AppTheme } from '../styles/unistyles'

export type TabWord = {
  status: StatusItem
  label: string
  color: string
}

export const tabsWords: (t: I18t, theme: AppTheme) => TabWord[] = (t, theme) => [
  {
    status: 'ALL',
    label: t('ui.all'),
    color: theme.colors.palette.white,
  },
  {
    status: 'STUDY',
    label: t('ui.in_study'),
    color: theme.colors.palette.item_study,
  },
  {
    status: 'READY',
    label: t('ui.study'),
    color: theme.colors.palette.item_ready,
  },
]
