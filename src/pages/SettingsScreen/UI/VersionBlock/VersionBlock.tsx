import Text from '@/shared/UI/Text/Text'
import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './VersionBlock.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { GOOGLE_PLAY } from '@/shared/constants/app'
import DeviceInfo from 'react-native-device-info'
import { useTranslation } from '@/shared/i18n/types'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import { compareVersions } from '@/shared/helpers/compareVersions'

const toUpdate = () => {
  openInBrowser(GOOGLE_PLAY)
}

// на экране — версия реально установленной сборки (versionName нативного
// билда); version из app config (задаётся в админке) — актуальная версия
// приложения, с ней сравнивается установленная для подсказки «обновить»
const VersionBlock: FC = () => {
  const { t } = useTranslation()

  const { data: appConfig } = useGetAppConfigQuery()

  const version = useMemo(() => DeviceInfo.getVersion(), [])

  const latestVersion = useMemo(
    () => appConfig?.version?.trim() ?? '',
    [appConfig]
  )

  const isOutdated = useMemo(
    () => !!latestVersion && compareVersions(version, latestVersion) < 0,
    [version, latestVersion]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.version}>
        {t('settingsScreen.version')} {version}
      </Text>

      {isOutdated ? (
        <>
          <Text style={styles.versionInvalid}>
            {t('settingsScreen.version_faild')}
          </Text>
          <TouchableOpacity onPress={toUpdate}>
            <Text style={styles.versionUpdate}>
              {t('settingsScreen.update')}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <></>
      )}
    </View>
  )
}

export default VersionBlock
