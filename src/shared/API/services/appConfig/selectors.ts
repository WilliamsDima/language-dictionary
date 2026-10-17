import type { AppConfigDTO } from './types'

// selectFromResult для useGetAppConfigQuery. То же условие наличия слайдов,
// что и в ModalYearResult: флаг showYearResult может быть взведён, а сама
// модалка итогов года не показана (нет слайдов) — глобальные модалки
// достижений ориентируются на это, чтобы не перекрывать итоги года
export const selectHasYearResultSlides = ({ data }: { data?: AppConfigDTO }) => ({
  hasYearResultSlides: !!data?.year_in_review?.slides?.some(
    (slide) => slide.enabled
  ),
})
