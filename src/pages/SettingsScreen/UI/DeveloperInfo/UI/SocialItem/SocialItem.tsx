import Text from '@/shared/UI/Text/Text'
import React, { FC, memo, useCallback, useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { styles } from './SocialItem.styles'

type Props = {
  link: string
  icon: string
  name: string
}

const SocialItem: FC<Props> = ({ link, icon, name }) => {
  const iconSource = useMemo(() => ({ uri: icon }), [icon])

  const onPress = useCallback(() => {
    openInBrowser(link)
  }, [link])

  return (
    <TouchableOpacity style={styles.social} onPress={onPress}>
      {icon ? (
        <FastImage
          style={styles.socialIcon}
          source={iconSource}
          resizeMode={FastImage.resizeMode.cover}
        />
      ) : (
        <></>
      )}
      <Text style={styles.socialText}>{name}</Text>
    </TouchableOpacity>
  )
}

export default memo(SocialItem)
