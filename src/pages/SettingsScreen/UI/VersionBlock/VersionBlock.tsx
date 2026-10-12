import Text from '@/shared/UI/Text/Text'
import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './VersionBlock.styles'
import openInBrowser from '@/shared/helpers/openInBrowser'
import { APP_DOWNLOAD_PAGE_URL } from '@/shared/constants/app'
import DeviceInfo from 'react-native-device-info'
import { useTranslation } from '@/shared/i18n/types'
import { useGetLatestReleaseQuery } from '@/shared/API/services/appRelease/AppReleaseQuery'
import { isNewerRelease } from '@/shared/API/services/appRelease/helpers'

const toUpdate = () => {
  openInBrowser(APP_DOWNLOAD_PAGE_URL)
}

// на экране — версия реально установленной сборки (versionName нативного
// билда). Наличие обновления определяется по latest.json опубликованного
// APK: его versionCode сравнивается с versionCode установленной сборки
// (getBuildNumber). Нет манифеста/сети — просто показываем текущую версию
const VersionBlock: FC = () => {
  const { t } = useTranslation()

  const { data: latestRelease } = useGetLatestReleaseQuery()

  const version = useMemo(() => DeviceInfo.getVersion(), [])

  const buildNumber = useMemo(() => DeviceInfo.getBuildNumber(), [])

  const isOutdated = useMemo(
    () => isNewerRelease(latestRelease, buildNumber),
    [latestRelease, buildNumber]
  )

  const availableVersionText = useMemo(
    () =>
      t('settingsScreen.version_available', {
        version: latestRelease?.versionName ?? '',
      }),
    [t, latestRelease]
  )

  return (
    <View style={styles.container}>
      <Text style={styles.version}>
        {t('settingsScreen.version')} {version}
      </Text>

      {isOutdated ? (
        <>
          <Text style={styles.versionAvailable}>{availableVersionText}</Text>
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
