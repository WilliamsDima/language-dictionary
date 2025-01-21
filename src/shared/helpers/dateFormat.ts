type Props = {
  date?: number | Date
  type: 'FULL'
}

export const dateFormat = ({ date, type }: Props) => {
  // Проверяем, является ли date корректной датой
  const parsedDate = typeof date === 'number' ? new Date(date) : date
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return undefined
  }

  switch (type) {
    case 'FULL': {
      if (date) {
        const day = new Date(date).getDate().toString()
        const month = (1 + new Date(date).getMonth()).toString()
        const year = new Date(date).getFullYear().toString()

        return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
      }
      break
    }
    default: {
      return undefined
    }
  }
}
