import React, { FC } from 'react'
import { styles } from './TabBarIcons.styles'
import { RoutesTitle } from '@/app/Navigation/RoutesNames'
import Svg, { G, Path } from 'react-native-svg'
import { COLORS } from '@/assets/styles/colors'

type ButtonTabBar = {
  routeName: RoutesTitle
  isFocused?: boolean
}

const TabBarIcons: FC<ButtonTabBar> = ({ routeName, isFocused }) => {
  switch (routeName) {
    case 'mainStack':
      return (
        <Svg
          width={40}
          height={40}
          stroke={isFocused ? COLORS.white : COLORS.white}
          fill={isFocused ? COLORS.green : 'transparent'}
          viewBox="0 0 24 24"
        >
          <Path
            fill={isFocused ? COLORS.green : 'transparent'}
            fillRule="nonzero"
            d="M18 2a2.5 2.5 0 0 1 2.5 2.5v14.25a.75.75 0 0 1-.75.75H5.5a1 1 0 0 0 1 1h13.25a.75.75 0 0 1 0 1.5H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Zm-2 3H8a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z"
          />
        </Svg>
      )

    case 'settingsStack':
      return (
        <Svg
          width={40}
          height={40}
          viewBox="0 0 30 30"
          stroke={isFocused ? COLORS.green : COLORS.white}
          fill={isFocused ? COLORS.green : COLORS.white}
        >
          <Path
            fill={isFocused ? COLORS.green : COLORS.white}
            fillRule="evenodd"
            d="M15 20c-2.739 0-4.958-2.238-4.958-5s2.219-5 4.958-5c2.739 0 4.959 2.238 4.959 5s-2.22 5-4.959 5Zm14.008-1.464-2.323-1.352c.13-.71.216-1.435.216-2.184 0-.748-.086-1.474-.216-2.184l2.323-1.352a2.008 2.008 0 0 0 .725-2.732L27.75 5.268a1.974 1.974 0 0 0-2.709-.732l-2.347 1.365c-1.096-.94-2.342-1.709-3.727-2.204V2c0-1.104-.888-2-1.984-2h-3.966a1.992 1.992 0 0 0-1.984 2v1.697c-1.385.495-2.631 1.264-3.727 2.204L4.959 4.536a1.974 1.974 0 0 0-2.709.732L.267 8.732a2.01 2.01 0 0 0 .725 2.732l2.323 1.352c-.13.71-.216 1.436-.216 2.184 0 .749.086 1.474.216 2.184L.992 18.536a2.01 2.01 0 0 0-.725 2.732l1.983 3.464a1.974 1.974 0 0 0 2.709.732l2.347-1.365c1.096.94 2.342 1.71 3.727 2.204V28c0 1.104.888 2 1.984 2h3.966a1.992 1.992 0 0 0 1.984-2v-1.697c1.385-.494 2.631-1.264 3.727-2.204l2.347 1.365a1.974 1.974 0 0 0 2.709-.732l1.983-3.464a2.008 2.008 0 0 0-.725-2.732ZM15 12c-1.643 0-2.975 1.344-2.975 3 0 1.657 1.332 3 2.975 3s2.975-1.343 2.975-3c0-1.656-1.332-3-2.975-3Z"
          />
        </Svg>
      )

    case 'profileStack':
      return (
        <Svg
          width={40}
          height={40}
          stroke={isFocused ? COLORS.green : COLORS.white}
          fill={isFocused ? COLORS.green : COLORS.white}
          viewBox="0 0 24 24"
        >
          <G fill="#000" fillRule="evenodd" clipRule="evenodd">
            <Path
              fill={isFocused ? COLORS.green : COLORS.white}
              d="M6.75 6.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0ZM4.25 18.571a5.321 5.321 0 0 1 5.321-5.321h4.858a5.321 5.321 0 0 1 5.321 5.321 4.179 4.179 0 0 1-4.179 4.179H8.43a4.179 4.179 0 0 1-4.179-4.179Z"
            />
          </G>
        </Svg>
      )

    default:
      return <></>
  }
}

export default TabBarIcons
