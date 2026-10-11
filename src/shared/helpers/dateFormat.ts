import i18n from 'i18next'

type Props = {
  date?: string | number | Date
  type: 'FULL'
  // локаль форматирования; по умолчанию — текущий язык интерфейса i18n
  locale?: string
}

const DEFAULT_LOCALE = 'ru'

const fullDateFormatters: Record<string, Intl.DateTimeFormat> = {}

const getFullDateFormatter = (locale: string): Intl.DateTimeFormat => {
  const cached = fullDateFormatters[locale]
  if (cached) {
    return cached
  }

  const formatter = (() => {
    try {
      return new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    } catch {
      // невалидный/неподдерживаемый движком код языка — фолбэк на ru
      return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
  })()

  fullDateFormatters[locale] = formatter
  return formatter
}

export const dateFormat = ({ date, type, locale }: Props) => {
  if (!date) {
    return undefined
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined
  }

  switch (type) {
    case 'FULL': {
      return getFullDateFormatter(
        locale || i18n.language || DEFAULT_LOCALE
      ).format(parsedDate)
    }
    default: {
      return undefined
    }
  }
}
