import React, { memo } from 'react'
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
} from 'react-native'

type Props = Omit<ImageProps, 'source'> & {
  src: ImageSourcePropType
  resizeMode?: ImageResizeMode
}

export const ImageIcon = memo(
  ({ src, resizeMode = 'contain', ...rest }: Props) => {
    return <Image source={src} resizeMode={resizeMode} {...rest} />
  }
)
