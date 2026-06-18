import React, { FC, memo, RefObject, useEffect, useState } from 'react'
import { styles } from './ModalAddLanguages.styles'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import DoneIcon from '@/assets/icons/UI/done-white-64.svg'
import { ILanguage, languages } from '@/shared/json/languages'
import { useTranslation } from '@/shared/i18n/types'
import Button from '@/shared/UI/Button/Button'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  selects?: ILanguage[]
  multiselect?: boolean
  onConfirm: (langs: ILanguage[]) => void
}

type LanguageOptionProps = {
  itemState: 'default' | 'activeMulti' | 'activeSingle'
  isLast: boolean
  iconIsError: boolean
  item: ILanguage
  onPress: () => void
  onImageError: () => void
}

const LanguageOption = memo(
  ({
    itemState,
    isLast,
    iconIsError,
    item,
    onPress,
    onImageError,
  }: LanguageOptionProps) => {
    styles.useVariants({
      itemState: itemState === 'default' ? undefined : itemState,
      doneActive: itemState === 'activeMulti',
      textActive: itemState === 'activeSingle',
      isLast,
    })

    return (
      <TouchableOpacity style={styles.item} onPress={onPress}>
        {itemState !== 'activeSingle' && (
          <View style={styles.done}>
            {itemState === 'activeMulti' && <DoneIcon width={15} height={15} />}
          </View>
        )}

        {!!item.country.flag && !iconIsError && (
          <Image
            source={{ uri: item.country.flag }}
            style={styles.flag}
            onError={onImageError}
          />
        )}
        <Text style={styles.full_name}>{item.full_name}</Text>
      </TouchableOpacity>
    )
  }
)

const ModalAddLanguages: FC<Props> = ({
  sheetRef,
  selects,
  multiselect = true,
  onConfirm,
}) => {
  const { t } = useTranslation()

  const [languagesSelects, setLanguagesSelects] = useState<ILanguage[]>([])
  const [isonsError, setIsonsError] = useState<number[]>([])

  const onSelectLanguages = (l: ILanguage) => {
    if (multiselect) {
      setLanguagesSelects((prev) => {
        const isLang = prev.some((it) => it.id === l.id)

        if (isLang) {
          return prev.filter((it) => it.id !== l.id)
        }

        return [...prev, l]
      })
    } else {
      setLanguagesSelects([l])
    }
  }

  const resetLanguages = () => {
    setLanguagesSelects([])
  }

  const onCancelHandler = () => {
    sheetRef.current?.dismiss()
  }

  useEffect(() => {
    if (selects?.length) {
      setLanguagesSelects(selects)
    }
  }, [selects])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={resetLanguages}
      title={t('modal.modalAddLanguages.title')}
      subtitle={
        multiselect
          ? 'Выбери несколько языков для статистики и подбора карточек'
          : 'Выбери один основной язык профиля'
      }
      dynamicSizing={false}
      snapPoints={['82%']}
      footer={
        <View style={styles.btns}>
          <Button
            type="BORDER-TRANSPARENT"
            classes={{
              btn: [styles.actionBtn, styles.actionBtnCancel],
              textBtn: styles.actionTextCancel,
            }}
            onPress={onCancelHandler}
          >
            {t('ui.cancel')}
          </Button>

          <Button
            classes={{
              btn: [styles.actionBtn, styles.actionBtnConfirm],
              textBtn: styles.actionTextConfirm,
            }}
            onPress={() => {
              onConfirm(languagesSelects)
              sheetRef.current?.dismiss()
            }}
          >
            {t('ui.apply')}
          </Button>
        </View>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        {languages.map((it, i) => {
          const active = languagesSelects.some((item) => item.id === it.id)
          const isLast = i === languages.length - 1
          const iconIsError = isonsError.includes(it.id)
          const itemState =
            active && multiselect
              ? 'activeMulti'
              : active
              ? 'activeSingle'
              : 'default'

          return (
            <LanguageOption
              key={it.id}
              itemState={itemState}
              isLast={isLast}
              iconIsError={iconIsError}
              item={it}
              onPress={() => {
                onSelectLanguages(it)
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

export default memo(ModalAddLanguages)
