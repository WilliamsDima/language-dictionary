import React, { FC, memo, RefObject, useState } from 'react'
import { styles } from './ModalLanguagesList.styles'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import { ILanguage, languages } from '@/shared/json/languages'
import { useTranslation } from '@/shared/i18n/types'
import Text from '@/shared/UI/Text/Text'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onSelect?: (visible: ILanguage) => void
  language?: ILanguage
}

type LanguageRowProps = {
  isActive: boolean
  isLast: boolean
  iconIsError: boolean
  item: ILanguage
  onPress: () => void
  onImageError: () => void
}

const LanguageRow = memo(
  ({
    isActive,
    isLast,
    iconIsError,
    item,
    onPress,
    onImageError,
  }: LanguageRowProps) => {
    styles.useVariants({
      isActive,
      isLast,
    })

    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <View style={styles.languageInfo}>
          <Text style={styles.name}>{item.full_name}</Text>
          <Text style={styles.code}>{item.short_name.toUpperCase()}</Text>
        </View>

        {!iconIsError && (
          <Image
            source={{ uri: item.country.flag }}
            style={styles.icon}
            onError={onImageError}
          />
        )}
      </TouchableOpacity>
    )
  }
)

/**
 * модалка выбора языка
 *
 * @format
 */

const ModalLanguagesList: FC<Props> = ({ sheetRef, onSelect, language }) => {
  const { t } = useTranslation()

  const [isonsError, setIsonsError] = useState<number[]>([])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      title={t('ui.language_selection')}
      subtitle="Выбери язык карточки для нового набора"
      dynamicSizing={false}
      snapPoints={['72%']}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.list}
      >
        {languages.map((it, i) => {
          const iconIsError = isonsError.includes(it.id)
          return (
            <LanguageRow
              key={it.id}
              item={it}
              isActive={language?.id === it.id}
              isLast={i === languages.length - 1}
              iconIsError={iconIsError}
              onPress={() => {
                onSelect && onSelect(it)
                sheetRef.current?.dismiss()
              }}
              onImageError={() => {
                setIsonsError((prev) => [...prev, it.id])
              }}
            />
          )
        })}
      </ScrollView>
    </BottomSheet>
  )
}

export default memo(ModalLanguagesList)
