import React, { FC, memo, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { styles } from './ReviewStar.styles'

type Props = {
  value: number
  active: boolean
  onPress: (value: number) => void
}

// один tap-to-rate элемент рейтинга: держит проп value вместо замыкания
// на него в родителе, поэтому родительский onPress можно передавать как
// стабильную useCallback-ссылку без пересоздания на каждый рендер
const ReviewStar: FC<Props> = ({ value, active, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(value)
  }, [onPress, value])

  styles.useVariants({ active })

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Text style={styles.star}>⭐</Text>
    </TouchableOpacity>
  )
}

export default memo(ReviewStar)
