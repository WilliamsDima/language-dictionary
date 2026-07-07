import { describe, expect, it } from '@jest/globals'
import {
  isWithinYearInReviewWindow,
  resolveYearInReviewTranslation,
} from './yearInReview'
import type {
  YearInReviewSlideConfig,
  YearInReviewWindow,
} from '@/shared/API/services/appConfig/types'

describe('isWithinYearInReviewWindow', () => {
  const window: YearInReviewWindow = {
    start_month: 12,
    start_day: 25,
    end_month: 12,
    end_day: 31,
    end_hour: 23,
    end_minute: 59,
  }

  it('должен вернуть false, если окно не задано', () => {
    expect(isWithinYearInReviewWindow(null, new Date(2025, 11, 26))).toBe(false)
    expect(isWithinYearInReviewWindow(undefined, new Date(2025, 11, 26))).toBe(
      false
    )
  })

  it('должен вернуть true внутри простого диапазона в пределах года', () => {
    expect(isWithinYearInReviewWindow(window, new Date(2025, 11, 28))).toBe(true)
  })

  it('должен вернуть false до начала диапазона', () => {
    expect(isWithinYearInReviewWindow(window, new Date(2025, 11, 20))).toBe(
      false
    )
  })

  it('должен вернуть false после конца диапазона', () => {
    expect(isWithinYearInReviewWindow(window, new Date(2026, 0, 1))).toBe(false)
  })

  it('должен учитывать час/минуту в последний день диапазона', () => {
    expect(
      isWithinYearInReviewWindow(window, new Date(2025, 11, 31, 23, 59))
    ).toBe(true)
    expect(
      isWithinYearInReviewWindow(window, new Date(2025, 11, 31, 23, 0))
    ).toBe(true)
    expect(isWithinYearInReviewWindow(window, new Date(2025, 11, 31, 0, 0))).toBe(
      true
    )
  })

  it('должен корректно обрабатывать диапазон, оборачивающийся через новый год', () => {
    const wrappingWindow: YearInReviewWindow = {
      start_month: 12,
      start_day: 28,
      end_month: 1,
      end_day: 3,
      end_hour: 23,
      end_minute: 59,
    }

    expect(isWithinYearInReviewWindow(wrappingWindow, new Date(2025, 11, 29))).toBe(
      true
    )
    expect(isWithinYearInReviewWindow(wrappingWindow, new Date(2026, 0, 1))).toBe(
      true
    )
    expect(isWithinYearInReviewWindow(wrappingWindow, new Date(2026, 0, 10))).toBe(
      false
    )
  })

  it('должен учитывать час/минуту, если конец диапазона выпадает на начало следующего года', () => {
    const wrappingWindow: YearInReviewWindow = {
      start_month: 12,
      start_day: 28,
      end_month: 1,
      end_day: 3,
      end_hour: 12,
      end_minute: 0,
    }

    expect(
      isWithinYearInReviewWindow(wrappingWindow, new Date(2026, 0, 3, 11, 0))
    ).toBe(true)
    expect(
      isWithinYearInReviewWindow(wrappingWindow, new Date(2026, 0, 3, 13, 0))
    ).toBe(false)
  })
})

describe('resolveYearInReviewTranslation', () => {
  const slide: YearInReviewSlideConfig = {
    id: 'cards_added',
    enabled: true,
    sort_order: 1,
    translations: {
      ru: { title: 'Карточки', description: 'Столько карточек вы добавили' },
      en: { title: 'Cards', description: 'This many cards you added' },
    },
  }

  it('должен вернуть перевод под текущую локаль, если он есть', () => {
    expect(resolveYearInReviewTranslation(slide, 'en')).toEqual({
      title: 'Cards',
      description: 'This many cards you added',
    })
  })

  it('должен откатиться на ru, если перевода под локаль нет', () => {
    expect(resolveYearInReviewTranslation(slide, 'de')).toEqual({
      title: 'Карточки',
      description: 'Столько карточек вы добавили',
    })
  })

  it('должен откатиться на en, если нет ни локали, ни ru', () => {
    const slideWithoutRu: YearInReviewSlideConfig = {
      ...slide,
      translations: { en: slide.translations.en },
    }

    expect(resolveYearInReviewTranslation(slideWithoutRu, 'de')).toEqual({
      title: 'Cards',
      description: 'This many cards you added',
    })
  })

  it('должен вернуть пустой текст, если переводов нет вообще', () => {
    const emptySlide: YearInReviewSlideConfig = { ...slide, translations: {} }

    expect(resolveYearInReviewTranslation(emptySlide, 'de')).toEqual({
      title: '',
      description: '',
    })
  })
})
