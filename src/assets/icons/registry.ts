import type {ImageSourcePropType} from 'react-native'

export const imageIcons = {
  'languages': require('../images/languages.png'),
  'login': require('../images/login.png'),
} as const satisfies Record<string, ImageSourcePropType>
