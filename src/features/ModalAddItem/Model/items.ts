import { IItem } from '@/entities/Item/model/item'

export type AddItemWords = {
  id: number
  word: string
  translate: string
}

// найденная похожая карточка + пара слово/перевод, которую показываем в подсказке
export type SimilarItem = {
  item: IItem
  word: string
  translate: string
}

export type SimilarHint = {
  items: SimilarItem[]
  // сколько ещё похожих карточек нашлось сверх показанных
  restCount: number
}
