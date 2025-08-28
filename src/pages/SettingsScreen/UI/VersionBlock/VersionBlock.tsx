import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './VersionBlock.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { GOOGLE_PLAY } from '@/shared/constants/app'
import DeviceInfo from 'react-native-device-info'

const VersionBlock: FC = () => {
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
      return 'Ваша версия приложения устарела'
    }
  }, [aplication, version])

  return (
    <View style={styles.container}>
      <Text style={styles.version}>Версия: {version}</Text>
      {/* <Text style={styles.version}>Версия appcenter: 1.0.6</Text> */}

      {!!checkVersion && (
        <>
          <Text style={styles.versionInvalid}>{checkVersion}</Text>
          <TouchableOpacity onPress={toUpdate}>
            <Text style={styles.versionUpdate}>Обновить</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  )
}

export default VersionBlock
