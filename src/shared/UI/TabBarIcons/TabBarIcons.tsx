import React, { FC } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './TabBarIcons.styles'
import { RoutesTitle } from '@/app/Navigation/RoutesNames'
import Svg, { G, Path } from 'react-native-svg'

type ButtonTabBar = {
  routeName: RoutesTitle
  isFocused?: boolean
}

const TabBarIcons: FC<ButtonTabBar> = ({ routeName, isFocused }) => {
  const { theme } = useUnistyles()
  const activeColor = theme.colors.palette.primery
  const inactiveColor = theme.colors.palette.gray_text

  switch (routeName) {
    case 'mainStack':
      return (
        <Svg
          width={24}
          height={24}
          stroke={isFocused ? activeColor : inactiveColor}
          fill={isFocused ? activeColor : inactiveColor}
          viewBox="0 0 1025 1024"
        >
          <Path
            fill={isFocused ? activeColor : inactiveColor}
            d="M960.356 1024h-512q-27 0-45.5-19t-18.5-45V832q0-26 18.5-45t45.5-19h512q26 0 45 19t19 45v128q0 27-19 45.5t-45 18.5zm0-384h-512q-27 0-45.5-18.5t-18.5-45.5V448q0-27 18.5-45.5t45.5-18.5h512q26 0 45 18.5t19 45.5v128q0 27-19 45.5t-45 18.5zm0-384h-512q-27 0-45.5-19t-18.5-45V64q0-27 18.5-45.5t45.5-18.5h512q26 0 45 18.5t19 45.5v128q0 26-19 45t-45 19zm-768 768h-128q-26 0-45-19t-19-45V832q0-26 19-45t45-19h128q26 0 45 19t19 45v128q0 27-18.5 45.5t-45.5 18.5zm0-384h-128q-26 0-45-18.5t-19-45.5V448q0-27 19-45.5t45-18.5h128q26 0 45 18.5t19 45.5v128q0 27-18.5 45.5t-45.5 18.5zm0-384h-128q-26 0-45-19t-19-45V64q0-27 19-45.5t45-18.5h128q26 0 45 18.5t19 45.5v128q0 26-18.5 45t-45.5 19z"
          />
        </Svg>
      )

    case 'settingsStack':
      return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 30 30"
          stroke={isFocused ? activeColor : inactiveColor}
          fill={isFocused ? activeColor : inactiveColor}
        >
          <Path
            fill={isFocused ? activeColor : inactiveColor}
            fillRule="evenodd"
            d="M15 20c-2.739 0-4.958-2.238-4.958-5s2.219-5 4.958-5c2.739 0 4.959 2.238 4.959 5s-2.22 5-4.959 5Zm14.008-1.464-2.323-1.352c.13-.71.216-1.435.216-2.184 0-.748-.086-1.474-.216-2.184l2.323-1.352a2.008 2.008 0 0 0 .725-2.732L27.75 5.268a1.974 1.974 0 0 0-2.709-.732l-2.347 1.365c-1.096-.94-2.342-1.709-3.727-2.204V2c0-1.104-.888-2-1.984-2h-3.966a1.992 1.992 0 0 0-1.984 2v1.697c-1.385.495-2.631 1.264-3.727 2.204L4.959 4.536a1.974 1.974 0 0 0-2.709.732L.267 8.732a2.01 2.01 0 0 0 .725 2.732l2.323 1.352c-.13.71-.216 1.436-.216 2.184 0 .749.086 1.474.216 2.184L.992 18.536a2.01 2.01 0 0 0-.725 2.732l1.983 3.464a1.974 1.974 0 0 0 2.709.732l2.347-1.365c1.096.94 2.342 1.71 3.727 2.204V28c0 1.104.888 2 1.984 2h3.966a1.992 1.992 0 0 0 1.984-2v-1.697c1.385-.494 2.631-1.264 3.727-2.204l2.347 1.365a1.974 1.974 0 0 0 2.709-.732l1.983-3.464a2.008 2.008 0 0 0-.725-2.732ZM15 12c-1.643 0-2.975 1.344-2.975 3 0 1.657 1.332 3 2.975 3s2.975-1.343 2.975-3c0-1.656-1.332-3-2.975-3Z"
          />
        </Svg>
      )

    case 'profileStack':
      return (
        <Svg
          width={24}
          height={24}
          stroke={isFocused ? activeColor : inactiveColor}
          fill={isFocused ? activeColor : inactiveColor}
          viewBox="0 0 24 24"
        >
          <G
            fill={theme.colors.palette.black_pure}
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <Path
              fill={isFocused ? activeColor : inactiveColor}
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
