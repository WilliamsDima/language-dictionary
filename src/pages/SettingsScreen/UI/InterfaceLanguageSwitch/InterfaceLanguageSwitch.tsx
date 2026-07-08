import React, { FC, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './InterfaceLanguageSwitch.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import ModalInterfaceLanguage from '@/features/ModalInterfaceLanguage/ModalInterfaceLanguage'
import CountryFlag from 'react-native-country-flag'
import ArrowDownIcon from '@/assets/icons/UI/arrow-down-green-64.svg'

// Смена языка интерфейса из настроек — переиспользует ту же модалку
// (ModalInterfaceLanguage), что и экран авторизации
const InterfaceLanguageSwitch: FC = () => {
  const { appLanguage } = useAppSelector((store) => store.app)
  const { t } = useTranslation()
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()

  const flag = useMemo(() => {
    if (!appLanguage) {
      return <Text style={styles.flagFallback}>🌍</Text>
    }

    return (
      <View style={styles.flag}>
        <CountryFlag isoCode={appLanguage.emoji.toLocaleLowerCase()} size={22} />
      </View>
    )
  }, [appLanguage])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settingsScreen.interface_language')}</Text>

      <TouchableOpacity style={styles.trigger} onPress={presentSheet}>
        {flag}

        <Text style={styles.value}>
          {appLanguage?.nativeName || t('ui.select_placeholder')}
        </Text>

        <ArrowDownIcon width={16} height={16} />
      </TouchableOpacity>

      <ModalInterfaceLanguage sheetRef={sheetRef} onDismiss={dismissSheet} />
    </View>
  )
}

export default InterfaceLanguageSwitch
