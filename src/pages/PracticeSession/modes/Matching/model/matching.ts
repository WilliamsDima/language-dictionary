import type { IItem } from '@/entities/Item/model/item'
import type { AnswersByCard } from '@/shared/helpers/answersStats'

// карточек в одном раунде «Найди пары»
export const MATCHING_GROUP_SIZE = 5

export type MatchingSide = 'word' | 'translation'

// плитка в колонке: сторона + карточка, текст которой она показывает
export type MatchingTile = {
  side: MatchingSide
  cardId: number
}

export type MatchingTileState = 'idle' | 'selected' | 'wrong' | 'matched'

export type MatchingState = {
  selected: MatchingTile | null
  // карточки, чьи плитки слова / перевода уже сопоставлены. Списки могут
  // расходиться при одинаковом слове или переводе у двух карточек группы
  matchedWordIds: number[]
  matchedTranslationIds: number[]
  // последняя неверная пара — подсвечивается, пока не сброшена
  wrong: { wordCardId: number; translationCardId: number } | null
  mistakes: number
  // карточки, для которых пару нашли не с первой попытки
  missedCardIds: number[]
}

export type MatchingAction =
  | { type: 'select'; tile: MatchingTile; cards: IItem[] }
  | { type: 'clear_wrong' }

export const initialMatchingState: MatchingState = {
  selected: null,
  matchedWordIds: [],
  matchedTranslationIds: [],
  wrong: null,
  mistakes: 0,
  missedCardIds: [],
}

const joinTexts = (texts: string[]): string =>
  texts
    .map((it) => it.trim())
    .filter(Boolean)
    .join(', ')

// текст плитки: все слова / переводы карточки через запятую
export const getCardWordText = (card: IItem): string =>
  joinTexts(card.items.map((it) => it.word))

export const getCardTranslationText = (card: IItem): string =>
  joinTexts(card.items.map((it) => it.translate))

const toTextKey = (text: string): string =>
  text.replace(/\s+/g, ' ').toLocaleLowerCase()

// у карточек одинаковое слово или перевод — в одной группе их плитки
// неотличимы, поэтому подходит любая из них
export const isAmbiguousPair = (a: IItem, b: IItem): boolean =>
  toTextKey(getCardWordText(a)) === toTextKey(getCardWordText(b)) ||
  toTextKey(getCardTranslationText(a)) === toTextKey(getCardTranslationText(b))

// размеры групп: по size, а остаток в 1 карточку (пара без выбора)
// забирает одну карточку у предыдущей группы — «…, 4, 2»
export const getMatchingGroupSizes = (
  count: number,
  size: number = MATCHING_GROUP_SIZE
): number[] => {
  const full = Math.floor(count / size)
  const rest = count % size
  const fullSizes = Array.from({ length: full }, () => size)

  if (!rest) return fullSizes
  if (rest === 1 && full > 0) return [...fullSizes.slice(1), size - 1, 2]

  return [...fullSizes, rest]
}

// группа нужного размера из оставшихся карточек: сначала карточки без
// совпадений по тексту с уже взятыми; не хватило — добираем любыми (тогда
// выручает isMatchingPair, принимающий одинаковые тексты)
const pickGroup = (
  remaining: IItem[],
  size: number
): { group: IItem[]; rest: IItem[] } => {
  const { group, skipped } = remaining.reduce<{
    group: IItem[]
    skipped: IItem[]
  }>(
    (acc, card) =>
      acc.group.length < size &&
      !acc.group.some((it) => isAmbiguousPair(it, card))
        ? { ...acc, group: [...acc.group, card] }
        : { ...acc, skipped: [...acc.skipped, card] },
    { group: [], skipped: [] }
  )
  const missing = size - group.length

  return {
    group: [...group, ...skipped.slice(0, missing)],
    rest: skipped.slice(missing),
  }
}

// карточки сессии (уже в случайном порядке) → раунды «Найди пары»
export const buildMatchingGroups = (
  cards: IItem[],
  size: number = MATCHING_GROUP_SIZE
): IItem[][] =>
  getMatchingGroupSizes(cards.length, size).reduce<{
    groups: IItem[][]
    remaining: IItem[]
  }>(
    (acc, groupSize) => {
      const { group, rest } = pickGroup(acc.remaining, groupSize)

      return { groups: [...acc.groups, group], remaining: rest }
    },
    { groups: [], remaining: cards }
  ).groups

// слово карточки wordCardId и перевод карточки translationCardId — пара:
// это одна карточка или у карточек одинаковое слово / перевод (тогда
// оставшиеся плитки тоже складываются в верную пару)
export const isMatchingPair = (
  cards: IItem[],
  wordCardId: number,
  translationCardId: number
): boolean => {
  if (wordCardId === translationCardId) return true

  const wordCard = cards.find((it) => it.id === wordCardId)
  const translationCard = cards.find((it) => it.id === translationCardId)

  return !!wordCard && !!translationCard
    ? isAmbiguousPair(wordCard, translationCard)
    : false
}

const isSameTile = (a: MatchingTile | null, b: MatchingTile): boolean =>
  !!a && a.side === b.side && a.cardId === b.cardId

const isTileMatched = (state: MatchingState, tile: MatchingTile): boolean =>
  (tile.side === 'word'
    ? state.matchedWordIds
    : state.matchedTranslationIds
  ).includes(tile.cardId)

const selectTile = (
  state: MatchingState,
  tile: MatchingTile,
  cards: IItem[]
): MatchingState => {
  const { selected } = state

  if (isTileMatched(state, tile)) return state

  // первая плитка пары или смена выбора в той же колонке (повторный тап —
  // снять выбор)
  if (!selected || selected.side === tile.side) {
    return {
      ...state,
      selected: isSameTile(selected, tile) ? null : tile,
      wrong: null,
    }
  }

  const wordCardId = tile.side === 'word' ? tile.cardId : selected.cardId
  const translationCardId =
    tile.side === 'translation' ? tile.cardId : selected.cardId

  if (isMatchingPair(cards, wordCardId, translationCardId)) {
    return {
      ...state,
      selected: null,
      wrong: null,
      matchedWordIds: [...state.matchedWordIds, wordCardId],
      matchedTranslationIds: [...state.matchedTranslationIds, translationCardId],
    }
  }

  // ошибка засчитывается карточке первой выбранной плитки — для неё и искали
  // пару
  return {
    ...state,
    selected: null,
    wrong: { wordCardId, translationCardId },
    mistakes: state.mistakes + 1,
    missedCardIds: state.missedCardIds.includes(selected.cardId)
      ? state.missedCardIds
      : [...state.missedCardIds, selected.cardId],
  }
}

export const matchingReducer = (
  state: MatchingState,
  action: MatchingAction
): MatchingState => {
  switch (action.type) {
    case 'select':
      return selectTile(state, action.tile, action.cards)
    case 'clear_wrong':
      return state.wrong ? { ...state, wrong: null } : state
    default:
      return state
  }
}

export const getMatchingTileState = (
  state: MatchingState,
  tile: MatchingTile
): MatchingTileState => {
  if (isTileMatched(state, tile)) return 'matched'
  if (isSameTile(state.selected, tile)) return 'selected'

  const wrongCardId =
    tile.side === 'word'
      ? state.wrong?.wordCardId
      : state.wrong?.translationCardId

  return wrongCardId === tile.cardId ? 'wrong' : 'idle'
}

export const isMatchingComplete = (
  state: MatchingState,
  cards: IItem[]
): boolean => !!cards.length && state.matchedWordIds.length >= cards.length

// ответы раунда: верно — пару нашли с первой попытки
export const getMatchingAnswers = (
  cards: IItem[],
  missedCardIds: number[]
): AnswersByCard =>
  cards.reduce<AnswersByCard>(
    (acc, card) => ({ ...acc, [card.id]: !missedCardIds.includes(card.id) }),
    {}
  )
