import type { IItem } from '@/entities/Item/model/item'

const joinTexts = (texts: string[]): string =>
  texts
    .map((it) => it.trim())
    .filter(Boolean)
    .join(', ')

// текст карточки в режимах практики: все слова / переводы через запятую
export const getCardWordText = (card: IItem): string =>
  joinTexts(card.items.map((it) => it.word))

export const getCardTranslationText = (card: IItem): string =>
  joinTexts(card.items.map((it) => it.translate))

// ключ сравнения текстов: без учёта регистра и лишних пробелов
export const toTextKey = (text: string): string =>
  text.trim().replace(/\s+/g, ' ').toLocaleLowerCase()
