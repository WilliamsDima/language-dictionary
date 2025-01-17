import { Dimensions, Platform, TextStyle } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const { width, height } = Dimensions.get('window')

const baseWidth = 347
const baseHeight = 812

const baseWidthRatio = width / baseWidth
const baseHeightRatio = height / baseHeight

export const APP_PADDING = scaleWidth(20)
export const SMALL_APP_PADDING = scaleWidth(10)

const PLATFORM_OS = Platform.OS
export const IS_IOS = PLATFORM_OS === 'ios'

const availableFontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export function scaleWidth(size: number, float?: boolean): number {
  const result = baseWidthRatio * size

  if (float) {
    return result
  }

  return Math.floor(result)
}

export function scaleHeight(size: number, float?: boolean): number {
  const result = baseHeightRatio * size

  if (float) {
    return result
  }

  return Math.floor(result)
}

export function scaleFontSize(size: number, module = 0): number {
  const ratio = IS_IOS ? baseWidthRatio : baseWidthRatio - module / size

  return Math.floor(ratio * size)
}

export function scaleFontWeight(size: number): TextStyle['fontWeight'] {
  const ratio = IS_IOS ? baseWidthRatio : baseWidthRatio - baseWidthRatio / size

  const weight = IS_IOS ? size : Math.floor((ratio * size) / 100) * 100 - 100

  return weight < 100
    ? '100'
    : weight > 900
    ? '900'
    : availableFontWeights.indexOf(weight) < 0
    ? '400'
    : (`${weight}` as TextStyle['fontWeight'])
}

export const isSmallDevices = width < 370 && height < 640

export const helloApp = () => {
  console.log(
    '%c Dictionary',
    'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)'
  )
  console.log(`version - ${DeviceInfo.getVersion()}`)
  console.log(`width - ${width} height - ${height}`)
}
