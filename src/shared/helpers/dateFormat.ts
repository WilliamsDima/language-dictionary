type Props = {
  date?: number | Date
  type: 'FULL'
}

export const dateFormat = ({ date, type }: Props) => {
  switch (type) {
    case 'FULL': {
      if (date) {
        const day = new Date(date).getDay().toString()
        const month = (1 + new Date(date).getMonth()).toString()
        const year = new Date(date).getFullYear().toString()

        return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
      }
    }
    default: {
      return ''
    }
  }
}
