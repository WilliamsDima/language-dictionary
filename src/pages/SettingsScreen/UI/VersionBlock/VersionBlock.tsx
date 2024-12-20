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

  const checkVersion = useMemo(() => {
    const currentVersion = DeviceInfo.getVersion()

    if (currentVersion === aplication?.version || !aplication?.version) {
      return ''
    }

    if (currentVersion !== aplication?.version) {
      return 'Ваша версия приложения устарела'
    }
  }, [aplication])

  return (
    <View style={styles.container}>
      <Text style={styles.version}>Версия: {aplication?.version}</Text>
      <Text style={styles.version}>Версия appcenter: 1.0.6</Text>

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
