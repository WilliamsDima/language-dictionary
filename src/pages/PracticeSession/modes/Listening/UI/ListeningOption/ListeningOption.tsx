import React, { FC, memo, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import type { ListeningOptionState } from '../../model/listening'
import { styles } from './ListeningOption.styles'

const TEXT_MAX_LINES = 3

type Props = {
  optionKey: string
  text: string
  state: ListeningOptionState
  disabled: boolean
  onPress: (optionKey: string) => void
}

// вариант ответа: после ответа верный — зелёный, ошибочно выбранный — красный
const ListeningOption: FC<Props> = ({
  optionKey,
  text,
  state,
  disabled,
  onPress,
}) => {
  styles.useVariants({ state })

  const handlePress = useCallback(() => {
    onPress(optionKey)
  }, [onPress, optionKey])

  return (
    <TouchableOpacity
      style={styles.option}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={handlePress}
    >
      <Text
        style={styles.text}
        numberOfLines={TEXT_MAX_LINES}
        adjustsFontSizeToFit
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export default memo(ListeningOption)
