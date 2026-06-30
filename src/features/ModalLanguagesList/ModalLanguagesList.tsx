import React, {
  FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { styles } from './ModalLanguagesList.styles'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { ILanguage } from '@/shared/API/services/languages/types'
import { useGetLanguagesQuery } from '@/shared/API/services/languages/LanguagesQuery'
import { useTranslation } from '@/shared/i18n/types'
import Text from '@/shared/UI/Text/Text'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Button from '@/shared/UI/Button/Button'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onDismiss?: () => void
  selects?: ILanguage[]
  multiselect?: boolean
  title?: string
  subtitle?: string
  closeOnSelect?: boolean
  withFooter?: boolean
  onConfirm: (langs: ILanguage[]) => void
}

type LanguageRowProps = {
  isActive: boolean
  isLast: boolean
  item: ILanguage
  onPress: () => void
}

const LanguageRow = memo(({ isActive, isLast, item, onPress }: LanguageRowProps) => {
  const itemStyles = useMemo(() => {
    return [
      styles.item,
      isActive ? styles.itemActive : null,
      isLast ? styles.itemLast : null,
    ]
  }, [isActive, isLast])

  const nameStyles = useMemo(() => {
    return [styles.name, isActive ? styles.nameActive : null]
  }, [isActive])

  return (
    <TouchableOpacity style={itemStyles} onPress={onPress}>
      <View style={styles.languageInfo}>
        <Text style={nameStyles}>{item.name}</Text>
        <Text style={styles.code}>{item.code.toUpperCase()}</Text>
      </View>

      <Text style={styles.icon}>{item.emoji}</Text>
    </TouchableOpacity>
  )
})

const ModalLanguagesList: FC<Props> = ({
  sheetRef,
  selects,
  multiselect = false,
  title,
  subtitle,
  closeOnSelect = false,
  withFooter = false,
  onConfirm,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { data: languages = [] } = useGetLanguagesQuery()

  const [selectedLanguages, setSelectedLanguages] = useState<ILanguage[]>([])

  const syncSelectedLanguages = useCallback(() => {
    setSelectedLanguages(selects || [])
  }, [selects])

  useEffect(() => {
    syncSelectedLanguages()
  }, [syncSelectedLanguages])

  const onSelectLanguage = useCallback(
    (language: ILanguage) => {
      if (closeOnSelect && !multiselect) {
        setSelectedLanguages([language])
        onConfirm([language])
        onDismiss?.()
        return
      }

      if (!multiselect) {
        setSelectedLanguages([language])
        return
      }

      setSelectedLanguages((prev) => {
        const isSelected = prev.some((item) => item.id === language.id)

        if (isSelected) {
          return prev.filter((item) => item.id !== language.id)
        }

        return [...prev, language]
      })
    },
    [closeOnSelect, multiselect, onConfirm, onDismiss]
  )

  const onApply = useCallback(() => {
    onConfirm(selectedLanguages)
    onDismiss?.()
  }, [onConfirm, onDismiss, selectedLanguages])

  const footer = withFooter ? (
    <View style={styles.footer}>
      <Button
        type="BORDER-TRANSPARENT"
        classes={{ btn: styles.footerBtn }}
        onPress={onDismiss}
      >
        {t('ui.cancel')}
      </Button>

      <Button classes={{ btn: styles.footerBtn }} onPress={onApply}>
        {t('ui.apply')}
      </Button>
    </View>
  ) : (
    <></>
  )

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onDismiss}
      title={title || t('ui.language_selection')}
      subtitle={subtitle || 'Выбери язык карточки для нового набора'}
      dynamicSizing={false}
      snapPoints={['72%']}
      footer={footer}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.list}
      >
        {languages.map((it, i) => {
          const isActive = selectedLanguages.some((item) => item.id === it.id)

          return (
            <LanguageRow
              key={it.id}
              item={it}
              isActive={isActive}
              isLast={i === languages.length - 1}
              onPress={() => {
                onSelectLanguage(it)
              }}
            />
          )
        })}
      </ScrollView>
    </BottomSheet>
  )
}

export default memo(ModalLanguagesList)
