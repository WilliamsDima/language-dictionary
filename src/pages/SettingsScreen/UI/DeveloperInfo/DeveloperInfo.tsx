import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles } from './DeveloperInfo.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { useTranslation } from '@/shared/i18n/types'

const DeveloperInfo: FC = () => {
  const { t } = useTranslation()
  const { aplication } = useAppSelector((store) => store.app)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settingsScreen.developerInfo.title')}
      </Text>

      {!!aplication?.developer && (
        <TouchableOpacity
          style={styles.developer}
          onPress={() => openInBrowser(aplication.developer.link)}
        >
          <FastImage
            style={styles.googleplay}
            source={{ uri: aplication.developer.icon }}
          />
          <Text style={styles.developerText}>
            {t('settingsScreen.developerInfo.googlePlayLink')}
          </Text>
        </TouchableOpacity>
      )}

      {!!aplication?.socials && (
        <>
          <Text style={styles.subtitle}>
            {t('settingsScreen.developerInfo.socials.title')}
          </Text>

          {aplication?.socials.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.social}
                onPress={() => openInBrowser(item.link)}
              >
                <FastImage style={styles.socialIcon} source={{ uri: item.icon }} />
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
