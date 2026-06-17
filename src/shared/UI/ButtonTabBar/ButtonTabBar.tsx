import React, { FC, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { styles } from './ButtonTabBar.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import TabBarIcons from '../TabBarIcons/TabBarIcons'
import Text from '../Text/Text'

type ButtonTabBar = {
  onPress?: () => void
  isFocused?: boolean
  assetNames: string
  routeName: TabsKeys
}

const ButtonTabBar: FC<ButtonTabBar> = ({
  isFocused,
  assetNames,
  onPress,
  routeName,
}) => {
  styles.useVariants({
    isFocused,
  })

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <TabBarIcons routeName={routeName} isFocused={isFocused} />
      <Text style={styles.title}>{assetNames}</Text>
    </TouchableOpacity>
  )
}

export default memo(ButtonTabBar)
