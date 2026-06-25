import type { I18t } from '@/shared/i18n/types'
import type {
  MainButtonSide,
  MainButtonSideValue,
  ShowVariantList,
} from '@/shared/store/slice/userSlice'
import { SHOW_VARIANTS_LIST } from '@/shared/constants/showVariants'

const translateSettingsList = <T extends { keyTranslate: Parameters<I18t>[0] }>(
  list: T[],
  t: I18t
): T[] => {
  return list.map((it) => {
    return {
      ...it,
      label: t(it.keyTranslate),
    }
  })
}

export const getShowVariantsList = (t: I18t): ShowVariantList[] => {
  return translateSettingsList(SHOW_VARIANTS_LIST, t)
}

export const getMainButtonSidesList = (t: I18t): MainButtonSide[] => {
  return translateSettingsList(
    [
      {
        label: 'Правша',
        value: 'right',
        keyTranslate: 'settingsScreen.mainButtonSides.right',
      },
      {
        label: 'Левша',
        value: 'left',
        keyTranslate: 'settingsScreen.mainButtonSides.left',
      },
    ],
    t
  )
}

export const normalizeMainButtonSide = (
  side: MainButtonSide | null | undefined
): MainButtonSideValue => {
  if (!side) {
    return 'right'
  }

  if (
    side.keyTranslate === 'settingsScreen.mainButtonSides.right' ||
    side.label === 'Правша'
  ) {
    return 'right'
  }

  if (
    side.keyTranslate === 'settingsScreen.mainButtonSides.left' ||
    side.label === 'Левша'
  ) {
    return 'left'
  }

  return side.value === 'left' ? 'left' : 'right'
}
