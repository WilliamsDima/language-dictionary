import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './VersionBlock.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { GOOGLE_PLAY } from '@/shared/constants/app'
import DeviceInfo from 'react-native-device-info'
import { useTranslation } from '@/shared/i18n/types'

const VersionBlock: FC = () => {
  const { t } = useTranslation()
  const { aplication } = useAppSelector((store) => store.app)

  const toUpdate = () => {
    openInBrowser(GOOGLE_PLAY)
  }

  const version = useMemo(() => {
    const currentVersion = DeviceInfo.getVersion()

    return currentVersion
  }, [aplication])

  const checkVersion = useMemo(() => {
    if (version === aplication?.version || !aplication?.version) {
      return ''
    }

    if (version !== aplication?.version) {
      return t('settingsScreen.version_faild')
    }
  }, [aplication, version])

  return (
    <View style={styles.container}>
      <Text style={styles.version}>
        {t('settingsScreen.version')} {version}
      </Text>
      {/* <Text style={styles.version}>Версия appcenter: 1.0.6</Text> */}

      {!!checkVersion && (
        <>
          <Text style={styles.versionInvalid}>{checkVersion}</Text>
          <TouchableOpacity onPress={toUpdate}>
            <Text style={styles.versionUpdate}>
              {t('settingsScreen.update')}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default VersionBlock
