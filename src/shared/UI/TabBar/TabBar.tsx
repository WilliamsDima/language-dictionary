import React, { FC, memo } from 'react'
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types'
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native'
import { styles } from './TabBar.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import { Shadow } from 'react-native-shadow-2'
import ButtonTabBar from '../ButtonTabBar/ButtonTabBar'

type Props = {
  state: TabNavigationState<ParamListBase>
  descriptors: BottomTabDescriptorMap
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}

const TabBar: FC<Props> = (props) => {
  const { state, navigation } = props

  const tabTitles = ['main']

  return (
    <Shadow containerStyle={styles.containerStyle} style={styles.tab}>
      {state?.routes.map((route, index) => {
        const isFocused = state.index === index

        const onPress = () => {
          if (route?.state?.routeNames) {
            navigation.navigate(route?.state?.routeNames[0])
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { merge: true })
            }
          }
        }

        return (
          <ButtonTabBar
            key={index}
            onPress={onPress}
            isFocused={isFocused}
            assetNames={tabTitles[index]}
            routeName={route.name as TabsKeys}
          />
        )
      })}
    </Shadow>
  )
}

export default memo(TabBar)
