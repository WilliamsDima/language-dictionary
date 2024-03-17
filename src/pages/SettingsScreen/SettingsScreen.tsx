import Layout from '@/shared/UI/Layout/Layout'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './SettingsScreen.styles'
import VersionBlock from './UI/VersionBlock/VersionBlock'
import AboutBlock from './UI/AboutBlock/AboutBlock'
import DeveloperInfo from './UI/DeveloperInfo/DeveloperInfo'
import Button from '@/shared/UI/Button/Button'
import openInBrowser from '@/shared/helpers/openInBrowser'

const SettingsScreen: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)

  const toPrivacyPolicy = () => {
    openInBrowser(aplication?.privacy_policy_link || '')
  }

  return (
    <Layout isScroll>
      <View style={styles.screen}>
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
          политика конфиденциальности
        </Button>
      </View>
    </Layout>
  )
}

export default SettingsScreen
