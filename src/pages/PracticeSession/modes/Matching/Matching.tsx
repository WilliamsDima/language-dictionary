import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { View } from 'react-native'
import type { IItem } from '@/entities/Item/model/item'
import { vibrateOnWrongAnswer } from '@/shared/helpers/gameVibration'
import { shuffleArray } from '@/shared/helpers/shuffleArray'
import type { PracticeGroupQuestionProps } from '../../model/types'
import {
  getCardTranslationText,
  getCardWordText,
} from '../../model/cardTexts'
import {
  MatchingSide,
  MatchingTile as MatchingTileValue,
  MatchingTileState,
  getMatchingAnswers,
  getMatchingTileState,
  initialMatchingState,
  isMatchingComplete,
  matchingReducer,
} from './model/matching'
import MatchingTile from './UI/MatchingTile/MatchingTile'
import { styles } from './Matching.styles'

// сколько держится подсветка неверной пары
const WRONG_FLASH_MS = 600
// пауза после последней пары, чтобы она успела подсветиться
const COMPLETE_DELAY_MS = 450

type TileView = {
  side: MatchingSide
  cardId: number
  text: string
  state: MatchingTileState
}

const buildTiles = (
  order: number[],
  side: MatchingSide,
  cardsById: Map<number, IItem>,
  getText: (card: IItem) => string
): Omit<TileView, 'state'>[] =>
  order.flatMap((cardId) => {
    const card = cardsById.get(cardId)

    return card ? [{ side, cardId, text: getText(card) }] : []
  })

// режим «Найди пары»: две колонки (слова и переводы) по группе карточек,
// каждая перемешана отдельно. Тап по слову и переводу в любом порядке:
// верная пара гаснет, неверная подсвечивается красным и выбор сбрасывается.
// Ошибки сразу уходят в движок (onMistake), ответы по карточкам — когда
// найдены все пары (верно — пару нашли с первой попытки)
const Matching: FC<PracticeGroupQuestionProps> = ({
  cards,
  showVariant,
  onMistake,
  onAnswer,
}) => {
  // порядок плиток фиксируется при монтировании: обновление карточек из кэша
  // не должно их перемешивать
  const [wordOrder] = useState(() => shuffleArray(cards.map((it) => it.id)))
  const [translationOrder] = useState(() =>
    shuffleArray(cards.map((it) => it.id))
  )
  const [state, dispatch] = useReducer(matchingReducer, initialMatchingState)

  const cardsById = useMemo(
    () => new Map(cards.map((it) => [it.id, it])),
    [cards]
  )

  const wordTiles = useMemo<TileView[]>(
    () =>
      buildTiles(wordOrder, 'word', cardsById, getCardWordText).map((it) => ({
        ...it,
        state: getMatchingTileState(state, it),
      })),
    [cardsById, state, wordOrder]
  )

  const translationTiles = useMemo<TileView[]>(
    () =>
      buildTiles(
        translationOrder,
        'translation',
        cardsById,
        getCardTranslationText
      ).map((it) => ({ ...it, state: getMatchingTileState(state, it) })),
    [cardsById, state, translationOrder]
  )

  // слева то, что показывается вопросом (ModalCardsFilter): слово или перевод
  const isWordFirst = useMemo(() => showVariant !== 'translate_only', [
    showVariant,
  ])

  const leftTiles = useMemo(
    () => (isWordFirst ? wordTiles : translationTiles),
    [isWordFirst, translationTiles, wordTiles]
  )

  const rightTiles = useMemo(
    () => (isWordFirst ? translationTiles : wordTiles),
    [isWordFirst, translationTiles, wordTiles]
  )

  const isComplete = useMemo(() => isMatchingComplete(state, cards), [
    cards,
    state,
  ])

  const onTilePress = useCallback(
    (tile: MatchingTileValue) => {
      dispatch({ type: 'select', tile, cards })
    },
    [cards]
  )

  useEffect(() => {
    if (!state.wrong) return

    const timer = setTimeout(
      () => dispatch({ type: 'clear_wrong' }),
      WRONG_FLASH_MS
    )

    return () => clearTimeout(timer)
  }, [state.wrong])

  // каждая новая ошибка раунда — сразу в счётчик сессии (onMistake от движка
  // стабилен, поэтому эффект срабатывает ровно на каждое изменение mistakes)
  useEffect(() => {
    if (state.mistakes) {
      onMistake()
    }
  }, [onMistake, state.mistakes])

  // редьюсер чистый, поэтому отклик на неверную пару — здесь
  useEffect(() => {
    if (state.mistakes) {
      vibrateOnWrongAnswer()
    }
  }, [state.mistakes])

  useEffect(() => {
    if (!isComplete) return

    const timer = setTimeout(
      () => onAnswer(getMatchingAnswers(cards, state.missedCardIds)),
      COMPLETE_DELAY_MS
    )

    return () => clearTimeout(timer)
  }, [cards, isComplete, onAnswer, state.missedCardIds])

  return (
    <View style={styles.wrapper}>
      <View style={styles.column}>
        {leftTiles.map((it) => (
          <MatchingTile
            key={`${it.side}-${it.cardId}`}
            side={it.side}
            cardId={it.cardId}
            text={it.text}
            state={it.state}
            onPress={onTilePress}
          />
        ))}
      </View>

      <View style={styles.column}>
        {rightTiles.map((it) => (
          <MatchingTile
            key={`${it.side}-${it.cardId}`}
            side={it.side}
            cardId={it.cardId}
            text={it.text}
            state={it.state}
            onPress={onTilePress}
          />
        ))}
      </View>
    </View>
  )
}

export default memo(Matching)
