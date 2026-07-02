// 10800 -> 10.8K
// 800 -> 800
export const numberFormatter = (num: number, digits?: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
    : '0'
}

export const formatNumberWithSpaces = (number: number) => {
  // Преобразование числа в строку
  const numberString = number.toString()

  // Разделение строки на массив по точке (если число с десятичной частью)
  const parts = numberString.split('.')

  // Форматирование целой части числа
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  // Сборка результата, добавляем десятичную часть, если она есть
  return parts.length === 2 ? `${integerPart}.${parts[1]}` : integerPart
}
