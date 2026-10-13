/**
 * @format
 */

import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import App from '@/app/App'
import { registerBackgroundPushHandler } from '@/shared/firebase/messaging'

registerBackgroundPushHandler()

AppRegistry.registerComponent(appName, () => App)
