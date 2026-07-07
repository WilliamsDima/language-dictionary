const swap = <T,>(array: T[], indexA: number, indexB: number): T[] => {
  const copy = [...array]
  const valueA = copy[indexA]

  copy[indexA] = copy[indexB]
  copy[indexB] = valueA

  return copy
}

const shuffleFrom = <T,>(array: T[], index: number): T[] => {
  if (index <= 0) return array

  const swapIndex = Math.floor(Math.random() * (index + 1))

  return shuffleFrom(swap(array, index, swapIndex), index - 1)
}

/**
 * Возвращает новый массив со случайным порядком элементов
 * (алгоритм Фишера — Йетса), не мутирует исходный массив.
 */
export const shuffleArray = <T,>(array: T[]): T[] =>
  shuffleFrom(array, array.length - 1)
