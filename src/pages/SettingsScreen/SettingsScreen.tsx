import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import { styles } from './SettingsScreen.styles'
import VersionBlock from './UI/VersionBlock/VersionBlock'
import AboutBlock from './UI/AboutBlock/AboutBlock'
import DeveloperInfo from './UI/DeveloperInfo/DeveloperInfo'
import Button from '@/shared/UI/Button/Button'
import openInBrowser from '@/shared/helpers/openInBrowser'
import Settings from './UI/Settings/Settings'
import { useTranslation } from '@/shared/i18n/types'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'

const SettingsScreen: FC = () => {
  const { t } = useTranslation()

  const { data: appConfig } = useGetAppConfigQuery()

  const toPrivacyPolicy = useCallback(() => {
    openInBrowser(appConfig?.privacy_policy_link || '')
  }, [appConfig])

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <Settings />
        <AboutBlock />
        <DeveloperInfo />
        <VersionBlock />

        <Button
          type="BORDER-TRANSPARENT"
          classes={{
            btn: styles.privacyPolicy,
            textBtn: styles.privacyPolicyText,
          }}
          onPress={toPrivacyPolicy}
        >
          {t('settingsScreen.privacy_policy')}
        </Button>
      </View>
    </Layout>
  )
}

export default SettingsScreen
