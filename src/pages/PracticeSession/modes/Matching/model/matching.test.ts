import type { IItem } from '@/entities/Item/model/item'
import {
  MatchingState,
  MatchingTile,
  buildMatchingGroups,
  getCardTranslationText,
  getCardWordText,
  getMatchingAnswers,
  getMatchingGroupSizes,
  getMatchingTileState,
  initialMatchingState,
  isMatchingComplete,
  isMatchingPair,
  matchingReducer,
} from './matching'

const makeItem = (id: number, word = `word ${id}`, translate = `перевод ${id}`): IItem => ({
  id,
  date: '2026-10-25',
  description: '',
  language: 'en',
  items: [{ id, word, translate }],
  status: 'STUDY',
})

const range = (count: number): IItem[] =>
  Array.from({ length: count }, (_, i) => makeItem(i + 1))

const select = (
  state: MatchingState,
  cards: IItem[],
  ...tiles: MatchingTile[]
): MatchingState =>
  tiles.reduce(
    (acc, tile) => matchingReducer(acc, { type: 'select', tile, cards }),
    state
  )

const word = (cardId: number): MatchingTile => ({ side: 'word', cardId })
const translation = (cardId: number): MatchingTile => ({
  side: 'translation',
  cardId,
})

describe('matching: group sizes', () => {
  it('splits by five and keeps a smaller last group', () => {
    expect(getMatchingGroupSizes(5)).toEqual([5])
    expect(getMatchingGroupSizes(10)).toEqual([5, 5])
    expect(getMatchingGroupSizes(13)).toEqual([5, 5, 3])
  })

  it('never leaves a single-card group', () => {
    expect(getMatchingGroupSizes(6)).toEqual([4, 2])
    expect(getMatchingGroupSizes(11)).toEqual([5, 4, 2])
    expect(getMatchingGroupSizes(1)).toEqual([1])
  })
})

describe('matching: groups', () => {
  it('uses every card exactly once', () => {
    const cards = range(23)
    const groups = buildMatchingGroups(cards)
    const ids = groups.flat().map((it) => it.id)

    expect(groups.map((it) => it.length)).toEqual([5, 5, 5, 5, 3])
    expect([...ids].sort((a, b) => a - b)).toEqual(cards.map((it) => it.id))
  })

  it('keeps cards with the same word or translation in different groups', () => {
    const cards = [
      makeItem(1, 'run', 'бежать'),
      makeItem(2, 'Run ', 'запуск'),
      makeItem(3, 'go', 'идти'),
      makeItem(4, 'walk', 'идти'),
      ...range(10).slice(4),
    ]
    const groups = buildMatchingGroups(cards)
    const groupOf = (id: number) =>
      groups.findIndex((group) => group.some((it) => it.id === id))

    expect(groupOf(1)).not.toBe(groupOf(2))
    expect(groupOf(3)).not.toBe(groupOf(4))
    expect(groups.map((it) => it.length)).toEqual([5, 5])
  })

  it('still fills a group when duplicates are unavoidable', () => {
    const cards = range(5).map((it) => makeItem(it.id, 'same', `t ${it.id}`))

    expect(buildMatchingGroups(cards).map((it) => it.length)).toEqual([5])
  })
})

describe('matching: texts and pairs', () => {
  it('joins every word and translation of a card', () => {
    const card: IItem = {
      ...makeItem(1),
      items: [
        { id: 1, word: ' big ', translate: 'большой' },
        { id: 2, word: 'large', translate: 'крупный' },
      ],
    }

    expect(getCardWordText(card)).toBe('big, large')
    expect(getCardTranslationText(card)).toBe('большой, крупный')
  })

  it('accepts the same card and cards with an identical text', () => {
    const cards = [
      makeItem(1, 'run', 'бежать'),
      makeItem(2, 'run', 'запуск'),
      makeItem(3, 'go', 'идти'),
    ]

    expect(isMatchingPair(cards, 1, 1)).toBe(true)
    expect(isMatchingPair(cards, 1, 2)).toBe(true)
    expect(isMatchingPair(cards, 1, 3)).toBe(false)
    expect(isMatchingPair(cards, 1, 99)).toBe(false)
  })
})

describe('matching: reducer', () => {
  const cards = range(3)

  it('matches a pair in either order', () => {
    const state = select(
      initialMatchingState,
      cards,
      word(1),
      translation(1),
      translation(2),
      word(2)
    )

    expect(state.matchedWordIds).toEqual([1, 2])
    expect(state.matchedTranslationIds).toEqual([1, 2])
    expect(state.mistakes).toBe(0)
    expect(state.selected).toBeNull()
  })

  it('switches and clears the selection within a column', () => {
    const switched = select(initialMatchingState, cards, word(1), word(2))
    expect(switched.selected).toEqual(word(2))

    const cleared = select(switched, cards, word(2))
    expect(cleared.selected).toBeNull()
  })

  it('counts a mistake for the first selected card and resets selection', () => {
    const state = select(
      initialMatchingState,
      cards,
      translation(2),
      word(1),
      translation(2),
      word(3)
    )

    expect(state.mistakes).toBe(2)
    expect(state.missedCardIds).toEqual([2])
    expect(state.selected).toBeNull()
    expect(state.wrong).toEqual({ wordCardId: 3, translationCardId: 2 })
    expect(getMatchingTileState(state, word(3))).toBe('wrong')
    expect(getMatchingTileState(state, translation(2))).toBe('wrong')
    expect(getMatchingTileState(state, word(1))).toBe('idle')

    const cleared = matchingReducer(state, { type: 'clear_wrong' })
    expect(cleared.wrong).toBeNull()
    expect(getMatchingTileState(cleared, word(3))).toBe('idle')
  })

  it('ignores taps on matched tiles', () => {
    const matched = select(initialMatchingState, cards, word(1), translation(1))

    expect(select(matched, cards, word(1))).toBe(matched)
    expect(getMatchingTileState(matched, word(1))).toBe('matched')
  })

  it('finishes when every pair is matched', () => {
    const almost = select(
      initialMatchingState,
      cards,
      word(1),
      translation(1),
      word(2),
      translation(2)
    )

    expect(isMatchingComplete(almost, cards)).toBe(false)
    expect(
      isMatchingComplete(select(almost, cards, word(3), translation(3)), cards)
    ).toBe(true)
  })
})

describe('matching: answers', () => {
  it('marks only pairs found on the first try as correct', () => {
    expect(getMatchingAnswers(range(3), [2])).toEqual({
      1: true,
      2: false,
      3: true,
    })
  })
})
