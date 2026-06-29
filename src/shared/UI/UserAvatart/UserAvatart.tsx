import React, { FC, memo } from 'react'
import { ViewStyle, View } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import { styles } from './UserAvatart.styles'
import Text from '../Text/Text'

/**
 * UI аватар пользователя
 *
 * @format
 */

type Props = {
  classes?: {
    image?: FastImageProps['style']
    wrapper?: ViewStyle | ViewStyle[]
  }
  uri?: string
  name?: string
}

const UserAvatart: FC<Props> = (props) => {
  const { classes, name, uri } = props

  return (
    <View style={[styles.wrapper, classes?.wrapper]}>
      {!!uri ? (
        <FastImage
          style={[styles.avatar, classes?.image]}
          source={{ uri }}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <Text style={styles.name}>{name ? name?.slice(0, 2) : 'NA'}</Text>
      )}
    </View>
  )
}

export default memo(UserAvatart)
