import type { IItem } from '@/entities/Item/model/item'
import {
  ListeningOption,
  buildListeningOptions,
  getListeningOptionState,
  getTtsHintKey,
  isListeningAnswerCorrect,
  isListeningCardPlayable,
} from './listening'

const makeItem = (
  id: number,
  word = `word ${id}`,
  translate = `перевод ${id}`,
  language = 'en'
): IItem => ({
  id,
  date: '2026-10-25',
  description: '',
  language,
  items: [{ id, word, translate }],
  status: 'STUDY',
})

const range = (count: number): IItem[] =>
  Array.from({ length: count }, (_, i) => makeItem(i + 1))

const texts = (options: ListeningOption[]): string[] =>
  options.map((it) => it.text)

describe('listening: options', () => {
  it('builds four distinct options with one correct', () => {
    const cards = range(10)
    const options = buildListeningOptions(cards[0], cards)

    expect(options).toHaveLength(4)
    expect(new Set(options.map((it) => it.key)).size).toBe(4)
    expect(options.filter((it) => it.isCorrect).map((it) => it.text)).toEqual([
      'перевод 1',
    ])
  })

  it('takes wrong options only from the same language', () => {
    const card = makeItem(1)
    const pool = [
      card,
      makeItem(2),
      makeItem(3),
      makeItem(4),
      makeItem(5, 'wort', 'немецкий 1', 'de'),
      makeItem(6, 'haus', 'немецкий 2', 'de'),
    ]

    expect(texts(buildListeningOptions(card, pool)).sort()).toEqual([
      'перевод 1',
      'перевод 2',
      'перевод 3',
      'перевод 4',
    ])
  })

  it('ignores case and spaces when comparing translations', () => {
    const card = makeItem(1, 'run', 'Бежать')
    const pool = [
      card,
      makeItem(2, 'jog', ' бежать '),
      makeItem(3, 'a', 'большой  дом'),
      makeItem(4, 'b', 'Большой дом'),
      makeItem(5, 'c', 'кот'),
      makeItem(6, 'd', 'пёс'),
    ]
    const options = buildListeningOptions(card, pool)

    expect(options).toHaveLength(4)
    expect(options.filter((it) => it.key === 'бежать')).toHaveLength(1)
    expect(options.filter((it) => it.key === 'большой дом')).toHaveLength(1)
  })

  it('skips cards with a shared word or a shared translation', () => {
    const card: IItem = {
      ...makeItem(1),
      items: [
        { id: 1, word: 'run', translate: 'бежать' },
        { id: 2, word: 'jog', translate: 'пробежка' },
      ],
    }
    const pool = [
      card,
      makeItem(2, 'RUN', 'запуск'),
      makeItem(3, 'sprint', 'пробежка'),
      makeItem(4, 'cat', 'кот'),
      makeItem(5, 'dog', 'пёс'),
      makeItem(6, 'owl', 'сова'),
    ]

    expect(texts(buildListeningOptions(card, pool)).sort()).toEqual([
      'бежать, пробежка',
      'кот',
      'пёс',
      'сова',
    ])
  })

  it('joins several translations of a card like Matching', () => {
    const card: IItem = {
      ...makeItem(1),
      items: [
        { id: 1, word: 'big', translate: ' большой ' },
        { id: 2, word: 'large', translate: 'крупный' },
      ],
    }

    expect(texts(buildListeningOptions(card, [card]))).toEqual([
      'большой, крупный',
    ])
  })
})

describe('listening: playable cards', () => {
  it('needs three distinct wrong options of the same language', () => {
    const cards = range(4)

    expect(isListeningCardPlayable(cards[0], cards)).toBe(true)
    expect(isListeningCardPlayable(cards[0], cards.slice(0, 3))).toBe(false)
  })

  it('does not count other languages and duplicate translations', () => {
    const card = makeItem(1)

    expect(
      isListeningCardPlayable(card, [
        card,
        makeItem(2),
        makeItem(3),
        makeItem(4, 'wort', 'слово', 'de'),
      ])
    ).toBe(false)
    expect(
      isListeningCardPlayable(card, [
        card,
        makeItem(2, 'a', 'кот'),
        makeItem(3, 'b', 'КОТ'),
        makeItem(4, 'c', 'пёс'),
      ])
    ).toBe(false)
  })

  it('rejects a card with nothing to speak', () => {
    expect(isListeningCardPlayable(makeItem(9, ' '), range(5))).toBe(false)
  })
})

describe('listening: answer', () => {
  const correct: ListeningOption = { key: 'a', text: 'a', isCorrect: true }
  const wrong: ListeningOption = { key: 'b', text: 'b', isCorrect: false }
  const other: ListeningOption = { key: 'c', text: 'c', isCorrect: false }

  it('keeps options idle until answered', () => {
    expect(getListeningOptionState(correct, null)).toBe('idle')
    expect(getListeningOptionState(wrong, null)).toBe('idle')
  })

  it('highlights the right option and the wrong choice', () => {
    expect(getListeningOptionState(correct, 'b')).toBe('correct')
    expect(getListeningOptionState(wrong, 'b')).toBe('wrong')
    expect(getListeningOptionState(other, 'b')).toBe('idle')
    expect(getListeningOptionState(correct, 'a')).toBe('correct')
    expect(getListeningOptionState(wrong, 'a')).toBe('idle')
  })

  it('detects whether the choice was correct', () => {
    const options = [correct, wrong]

    expect(isListeningAnswerCorrect(options, 'a')).toBe(true)
    expect(isListeningAnswerCorrect(options, 'b')).toBe(false)
    expect(isListeningAnswerCorrect(options, null)).toBe(false)
  })
})

describe('listening: speech hint', () => {
  it('maps speech errors to the tts hints', () => {
    expect(getTtsHintKey('ok')).toBeNull()
    expect(getTtsHintKey('no_engine')).toBe('tts.no_engine')
    expect(getTtsHintKey('lang_unavailable')).toBe('tts.lang_unavailable')
    expect(getTtsHintKey('failed')).toBe('tts.error')
  })
})
