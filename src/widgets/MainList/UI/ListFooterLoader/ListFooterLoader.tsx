import React, { FC, memo } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ListFooterLoader.styles'

type Props = {
  isLoading: boolean
}

const ListFooterLoader: FC<Props> = ({ isLoading }) => {
  const { theme } = useUnistyles()

  if (!isLoading) return <></>

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <ActivityIndicator size="large" color={theme.colors.palette.primery} />
    </View>
  )
}

export default memo(ListFooterLoader)
