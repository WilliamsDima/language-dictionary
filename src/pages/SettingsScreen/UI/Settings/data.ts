import type { I18t } from '@/shared/i18n/types'
import type { ShowVariantList } from '@/shared/store/slice/userSlice'

export const getShowVariantsList = (
  list: ShowVariantList[],
  t: I18t
): ShowVariantList[] => {
  return list.map((it) => {
    return {
      ...it,
      label: t(it.keyTranslate),
    }
  })
}
