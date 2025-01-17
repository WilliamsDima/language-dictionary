import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { styles } from './DeveloperInfo.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'

const DeveloperInfo: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Информация о авторе.</Text>

      {!!aplication?.developer && (
        <TouchableOpacity
          style={styles.developer}
          onPress={() => openInBrowser(aplication.developer.link)}
        >
          <Image
            style={styles.googleplay}
            source={{ uri: aplication.developer.icon }}
          />
          <Text style={styles.developerText}>{aplication.developer.text}</Text>
        </TouchableOpacity>
      )}

      {!!aplication?.socials && (
        <>
          <Text style={styles.subtitle}>Связь:</Text>

          {aplication?.socials.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.social}
                onPress={() => openInBrowser(item.link)}
              >
                <Image style={styles.socialIcon} source={{ uri: item.icon }} />
                <Text style={styles.socialText}>{item.name}</Text>
              </TouchableOpacity>
            )
          })}
        </>
      )}
    </View>
  )
}

export default DeveloperInfo
