import React, {
  FC,
  memo,
  RefObject,
  useCallback,
  useMemo,
} from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { styles } from './ModalInterfaceLanguage.styles'
import Text from '@/shared/UI/Text/Text'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import CountryFlag from 'react-native-country-flag'
import { useTranslation } from '@/shared/i18n/types'
import { useAppLanguageSwitch } from '@/shared/hooks/useAppLanguageSwitch'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onDismiss?: () => void
}

type InterfaceLanguageRowProps = {
  item: AppLanguageType
  isActive: boolean
  isLoading: boolean
  onSelect: (lang: AppLanguageType) => void
}

const InterfaceLanguageRow = memo(
  ({ item, isActive, isLoading, onSelect }: InterfaceLanguageRowProps) => {
    const rowStyles = useMemo(() => {
      return [styles.item, isActive ? styles.itemActive : null]
    }, [isActive])

    const nameStyles = useMemo(() => {
      return [styles.itemName, isActive ? styles.itemNameActive : null]
    }, [isActive])

    const handlePress = useCallback(() => {
      onSelect(item)
    }, [item, onSelect])

    return (
      <TouchableOpacity
        style={rowStyles}
        onPress={handlePress}
        disabled={isLoading}
      >
        <View style={styles.itemFlag}>
          <CountryFlag isoCode={item.emoji.toLocaleLowerCase()} size={28} />
        </View>

        <View style={styles.itemCopy}>
          <Text style={nameStyles}>{item.nativeName}</Text>
          <Text style={styles.itemHint}>{item.name}</Text>
        </View>

        <View style={styles.itemMeta}>
          <Text style={styles.itemCode}>{item.code.toUpperCase()}</Text>

          {isActive && isLoading ? (
            <ActivityIndicator size="small" style={styles.itemLoader} />
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
    )
  }
)

// Модалка выбора языка интерфейса — сама владеет логикой применения языка
// (см. useAppLanguageSwitch), переиспользуется на экране авторизации и в
// настройках
const ModalInterfaceLanguage: FC<Props> = ({ sheetRef, onDismiss }) => {
  const { t } = useTranslation()
  const { appLanguage, languages, loading, onSelectLanguage } =
    useAppLanguageSwitch()

  const handleSelect = useCallback(
    async (lang: AppLanguageType) => {
      await onSelectLanguage(lang)
      sheetRef.current?.dismiss()
    },
    [onSelectLanguage, sheetRef]
  )

  const renderRow = useCallback(
    (item: AppLanguageType) => {
      const isActive = item.code === appLanguage?.code

      return (
        <InterfaceLanguageRow
          key={item.code}
          item={item}
          isActive={isActive}
          isLoading={loading}
          onSelect={handleSelect}
        />
      )
    },
    [appLanguage?.code, handleSelect, loading]
  )

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onDismiss}
      title={t('settingsScreen.interface_language')}
      subtitle={t('settingsScreen.interface_language_subtitle')}
      dynamicSizing={false}
      snapPoints={['68%']}
    >
      <View style={styles.list}>{languages.map(renderRow)}</View>
    </BottomSheet>
  )
}

export default memo(ModalInterfaceLanguage)
