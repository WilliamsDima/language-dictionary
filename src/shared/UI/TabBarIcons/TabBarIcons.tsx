import React, { FC } from 'react'
import { styles } from './TabBarIcons.styles'
import { TabsKeys } from '@/app/Navigation/RoutesNames'
import Svg, { Path } from 'react-native-svg'
import { COLORS } from '@/assets/styles/colors'

type ButtonTabBar = {
  routeName: TabsKeys
  isFocused?: boolean
}

const TabBarIcons: FC<ButtonTabBar> = ({ routeName, isFocused }) => {
  switch (routeName) {
    case 'mainStack':
      return (
        <Svg width={40} height={40} fill="none">
          <Path
            stroke={isFocused ? COLORS.white : COLORS.white}
            strokeWidth={2}
            fill={isFocused ? COLORS.white : 'transparent'}
            d="M16.667 4.583c6.673 0 12.083 5.41 12.083 12.084 0 2.886-1.012 5.536-2.7 7.614l8.167 8.169a1.25 1.25 0 0 1-1.627 1.888l-.14-.12-8.169-8.169a12.033 12.033 0 0 1-7.614 2.701c-6.674 0-12.084-5.41-12.084-12.083 0-6.674 5.41-12.084 12.084-12.084Zm0 2.5a9.583 9.583 0 1 0 0 19.167 9.583 9.583 0 0 0 0-19.167Z"
          />
        </Svg>
      )

    default:
      return <></>
  }
}

export default TabBarIcons
