import React, { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, TouchableOpacity, View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import type {
  MatchingSide,
  MatchingTile as MatchingTileValue,
  MatchingTileState,
} from '../../model/matching'
import { styles } from './MatchingTile.styles'

const SHAKE_OFFSET = 8
const SHAKE_STEP_MS = 50
const MATCHED_OPACITY = 0.35
const MATCHED_FADE_MS = 300
const MATCHED_FADE_DELAY_MS = 150
const TEXT_MAX_LINES = 3

type Props = {
  side: MatchingSide
  cardId: number
  text: string
  state: MatchingTileState
  onPress: (tile: MatchingTileValue) => void
}

// плитка слова или перевода: выбрана — рамка, неверная пара — красная
// подсветка с покачиванием, найденная пара — зелёная и гаснет
const MatchingTile: FC<Props> = ({ side, cardId, text, state, onPress }) => {
  const shake = useRef(new Animated.Value(0)).current
  const opacity = useRef(new Animated.Value(1)).current

  styles.useVariants({ state })

  // анимация — на внешнем Animated.View, вариант состояния — на внутреннем
  const animatedStyle = useMemo(
    () => [styles.animated, { opacity, transform: [{ translateX: shake }] }],
    [opacity, shake]
  )

  const isDisabled = useMemo(() => state === 'matched', [state])

  const handlePress = useCallback(() => {
    onPress({ side, cardId })
  }, [cardId, onPress, side])

  useEffect(() => {
    if (state !== 'wrong') return

    Animated.sequence(
      [SHAKE_OFFSET, -SHAKE_OFFSET, SHAKE_OFFSET, 0].map((toValue) =>
        Animated.timing(shake, {
          toValue,
          duration: SHAKE_STEP_MS,
          useNativeDriver: true,
        })
      )
    ).start()
  }, [shake, state])

  useEffect(() => {
    const isMatched = state === 'matched'

    Animated.timing(opacity, {
      toValue: isMatched ? MATCHED_OPACITY : 1,
      duration: MATCHED_FADE_MS,
      delay: isMatched ? MATCHED_FADE_DELAY_MS : 0,
      useNativeDriver: true,
    }).start()
  }, [opacity, state])

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={handlePress}
    >
      <Animated.View style={animatedStyle}>
        <View style={styles.tile}>
          <Text
            style={styles.text}
            numberOfLines={TEXT_MAX_LINES}
            adjustsFontSizeToFit
          >
            {text}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default memo(MatchingTile)
