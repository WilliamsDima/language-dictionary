type Props = {
  date?: string | number | Date
  type: 'FULL'
}

const fullDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const dateFormat = ({ date, type }: Props) => {
  if (!date) {
    return undefined
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return undefined
  }

  switch (type) {
    case 'FULL': {
      return fullDateFormatter.format(parsedDate)
    }
    default: {
      return undefined
    }
  }
}
