import React, { FC, memo } from 'react'
import { ViewStyle, View, Image, ImageStyle } from 'react-native'
import { styles } from './UserAvatart.styles'
import Text from '../Text/Text'

/**
 * UI аватар пользователя
 *
 * @format
 */

type Props = {
  classes?: {
    image?: ImageStyle | ImageStyle[]
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
        <Image style={[styles.avatar, classes?.image]} source={{ uri }} />
      ) : (
        <Text style={styles.name}>{name ? name?.slice(0, 2) : 'NA'}</Text>
      )}
    </View>
  )
}

export default memo(UserAvatart)
