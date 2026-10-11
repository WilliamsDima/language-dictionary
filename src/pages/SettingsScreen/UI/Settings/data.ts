import type { I18NKeys, I18t } from '@/shared/i18n/types'
import {
  isShowVariantListVale,
  type MainButtonSide,
  type MainButtonSideValue,
  type ShowVariantList,
} from '@/shared/store/slice/userSlice'
import { SHOW_VARIANTS_LIST } from '@/shared/constants/showVariants'
import type { AppConfigShowVariant } from '@/shared/API/services/appConfig/types'

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

// варианты из app config (showVariantsList, редактируется в админке):
// label — ключ перевода, value — только известные клиенту значения,
// остальные и дубли пропускаются. Пустой/отсутствующий конфиг — фолбэк на
// зашитый SHOW_VARIANTS_LIST
const fromConfigShowVariants = (
  configList: AppConfigShowVariant[] | undefined
): ShowVariantList[] => {
  return (configList ?? []).reduce<ShowVariantList[]>((acc, it) => {
    const value = it?.value

    if (
      typeof value !== 'string' ||
      !isShowVariantListVale(value) ||
      acc.some((variant) => variant.value === value)
    ) {
      return acc
    }

    const fallback = SHOW_VARIANTS_LIST.find((item) => item.value === value)
    const keyTranslate =
      typeof it.label === 'string' && it.label.trim()
        ? (it.label.trim() as I18NKeys)
        : fallback?.keyTranslate

    if (!keyTranslate) {
      return acc
    }

    return [
      ...acc,
      {
        label: fallback?.label ?? value,
        value,
        keyTranslate,
      },
    ]
  }, [])
}

export const getShowVariantsList = (
  t: I18t,
  configList?: AppConfigShowVariant[]
): ShowVariantList[] => {
  const fromConfig = fromConfigShowVariants(configList)

  return translateSettingsList(
    fromConfig.length ? fromConfig : SHOW_VARIANTS_LIST,
    t
  )
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
