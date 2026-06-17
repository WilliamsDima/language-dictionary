import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const { width, height } = Dimensions.get('window')

const PLATFORM_OS = Platform.OS
export const IS_IOS = PLATFORM_OS === 'ios'

export const isSmallDevices = width < 370 && height < 640

export const helloApp = () => {
  console.log(
    '%c Dictionary',
    'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
  )
  console.log(`version - ${DeviceInfo.getVersion()}`)
  console.log(`width - ${width} height - ${height}`)
}
