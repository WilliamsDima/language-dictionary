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
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <TabBarIcons routeName={routeName} isFocused={isFocused} />
      {/* {isFocused && (
        <Text style={[styles.title, isFocused && styles.activeText]}>
          {assetNames}
        </Text>
      )} */}
    </TouchableOpacity>
  )
}

export default memo(ButtonTabBar)
