import React from 'react'
import {SvgProps} from 'react-native-svg'
import {SvgIcon} from './variants/SvgIcon'
import {ImageIcon} from './variants/ImageIcon'
import {imageIcons} from './registry'
import type {ImageResizeMode, ImageStyle, StyleProp, ViewStyle} from 'react-native'

export type SvgName =
  | 'arrow-down-green-64'
  | 'arrow-top-white-64'
  | 'close-red-64'
  | 'done-black-64'
  | 'done-primery-64'
  | 'done-white-64'
  | 'dots-vertical-white-64'
  | 'download'
  | 'earth'
  | 'edit-green-64'
  | 'error-circle-red-64'
  | 'filter-primery-64'
  | 'filter-white-64'
  | 'google'
  | 'plus-green-64'
  | 'plus'
  | 'ready-green-64'
  | 'repeat-64-orange'
  | 'save-primery-64'
  | 'search'
  | 'sound-primery-64'
  | 'translate-primery-64'
  | 'trash-red-64'
  | 'up-circle'

export type ImageName = keyof typeof imageIcons

type SvgPublicProps = Omit<SvgProps, 'style'> & {
  style?: StyleProp<ViewStyle>
  color?: SvgProps['color']
}

type KindMap = {
  svg: {
    name: SvgName
  } & SvgPublicProps
  image: {
    name: ImageName
    width: number
    height: number
    style?: StyleProp<ImageStyle>
    resizeMode?: ImageResizeMode
  }
}

export function Icon<K extends keyof KindMap>(props: {kind: K} & KindMap[K]) {
  if (props.kind === 'svg') {
    const svgProps = props as {kind: 'svg'} & KindMap['svg']
    switch (svgProps.name) {
      case 'arrow-down-green-64': {
        const {SvgArrowDownGreen64} = require('./svg/components/ArrowDownGreen64')
        return <SvgIcon Component={SvgArrowDownGreen64} {...svgProps} />
      }
      case 'arrow-top-white-64': {
        const {SvgArrowTopWhite64} = require('./svg/components/ArrowTopWhite64')
        return <SvgIcon Component={SvgArrowTopWhite64} {...svgProps} />
      }
      case 'close-red-64': {
        const {SvgCloseRed64} = require('./svg/components/CloseRed64')
        return <SvgIcon Component={SvgCloseRed64} {...svgProps} />
      }
      case 'done-black-64': {
        const {SvgDoneBlack64} = require('./svg/components/DoneBlack64')
        return <SvgIcon Component={SvgDoneBlack64} {...svgProps} />
      }
      case 'done-primery-64': {
        const {SvgDonePrimery64} = require('./svg/components/DonePrimery64')
        return <SvgIcon Component={SvgDonePrimery64} {...svgProps} />
      }
      case 'done-white-64': {
        const {SvgDoneWhite64} = require('./svg/components/DoneWhite64')
        return <SvgIcon Component={SvgDoneWhite64} {...svgProps} />
      }
      case 'dots-vertical-white-64': {
        const {SvgDotsVerticalWhite64} = require('./svg/components/DotsVerticalWhite64')
        return <SvgIcon Component={SvgDotsVerticalWhite64} {...svgProps} />
      }
      case 'download': {
        const {SvgDownload} = require('./svg/components/Download')
        return <SvgIcon Component={SvgDownload} {...svgProps} />
      }
      case 'earth': {
        const {SvgEarth} = require('./svg/components/Earth')
        return <SvgIcon Component={SvgEarth} {...svgProps} />
      }
      case 'edit-green-64': {
        const {SvgEditGreen64} = require('./svg/components/EditGreen64')
        return <SvgIcon Component={SvgEditGreen64} {...svgProps} />
      }
      case 'error-circle-red-64': {
        const {SvgErrorCircleRed64} = require('./svg/components/ErrorCircleRed64')
        return <SvgIcon Component={SvgErrorCircleRed64} {...svgProps} />
      }
      case 'filter-primery-64': {
        const {SvgFilterPrimery64} = require('./svg/components/FilterPrimery64')
        return <SvgIcon Component={SvgFilterPrimery64} {...svgProps} />
      }
      case 'filter-white-64': {
        const {SvgFilterWhite64} = require('./svg/components/FilterWhite64')
        return <SvgIcon Component={SvgFilterWhite64} {...svgProps} />
      }
      case 'google': {
        const {SvgGoogle} = require('./svg/components/Google')
        return <SvgIcon Component={SvgGoogle} {...svgProps} />
      }
      case 'plus-green-64': {
        const {SvgPlusGreen64} = require('./svg/components/PlusGreen64')
        return <SvgIcon Component={SvgPlusGreen64} {...svgProps} />
      }
      case 'plus': {
        const {SvgPlus} = require('./svg/components/Plus')
        return <SvgIcon Component={SvgPlus} {...svgProps} />
      }
      case 'ready-green-64': {
        const {SvgReadyGreen64} = require('./svg/components/ReadyGreen64')
        return <SvgIcon Component={SvgReadyGreen64} {...svgProps} />
      }
      case 'repeat-64-orange': {
        const {SvgRepeat64Orange} = require('./svg/components/Repeat64Orange')
        return <SvgIcon Component={SvgRepeat64Orange} {...svgProps} />
      }
      case 'save-primery-64': {
        const {SvgSavePrimery64} = require('./svg/components/SavePrimery64')
        return <SvgIcon Component={SvgSavePrimery64} {...svgProps} />
      }
      case 'search': {
        const {SvgSearch} = require('./svg/components/Search')
        return <SvgIcon Component={SvgSearch} {...svgProps} />
      }
      case 'sound-primery-64': {
        const {SvgSoundPrimery64} = require('./svg/components/SoundPrimery64')
        return <SvgIcon Component={SvgSoundPrimery64} {...svgProps} />
      }
      case 'translate-primery-64': {
        const {SvgTranslatePrimery64} = require('./svg/components/TranslatePrimery64')
        return <SvgIcon Component={SvgTranslatePrimery64} {...svgProps} />
      }
      case 'trash-red-64': {
        const {SvgTrashRed64} = require('./svg/components/TrashRed64')
        return <SvgIcon Component={SvgTrashRed64} {...svgProps} />
      }
      case 'up-circle': {
        const {SvgUpCircle} = require('./svg/components/UpCircle')
        return <SvgIcon Component={SvgUpCircle} {...svgProps} />
      }
      default:
        return null
    }
  }

  const imageProps = props as {kind: 'image'} & KindMap['image']
  const src = imageIcons[imageProps.name]

  return (
    <ImageIcon
      src={src}
      style={[{width: imageProps.width, height: imageProps.height}, imageProps.style]}
      resizeMode={imageProps.resizeMode}
    />
  )
}
