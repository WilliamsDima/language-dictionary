import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { styles } from './FlashcardWord.styles'

// с какой длины фраза считается длинной и рендерится уменьшенным шрифтом
const LONG_TEXT_LENGTH = 20

type Props = {
  front: string
  back: string
  isFlipped: boolean
}

// одна пара слово/перевод на карточке: до переворота — front, после — back
const FlashcardWord: FC<Props> = ({ front, back, isFlipped }) => {
  const text = useMemo(
    () => (isFlipped ? back : front),
    [isFlipped, front, back]
  )

  const isLong = useMemo(() => text.length > LONG_TEXT_LENGTH, [text])

  styles.useVariants({
    isFlipped,
    isLong,
  })

  return (
    <View style={styles.word}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default memo(FlashcardWord)
