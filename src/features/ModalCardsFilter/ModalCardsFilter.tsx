import React, { FC, memo, RefObject, useCallback, useMemo, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ModalCardsFilter.styles'
import { View, TouchableOpacity } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { tabsWords } from '@/shared/helpers/tabsWord'
import { useActions } from '@/shared/hooks/useActions'
import { StatusItem } from '@/entities/Item/model/item'
import { ShowVariantListVale } from '@/shared/store/slice/userSlice'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import { SelectOption } from '@/shared/UI/types'
import { useTranslation } from '@/shared/i18n/types'
import { useAppSelector } from '@/shared/hooks/useStore'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'
import type { CardsLimitValue } from '@/shared/store/slice/itemsSlice'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onDismiss: () => void
}

type FilterChipProps<T> = {
  active: boolean
  label: string
  value: T
  color?: string
  onPress: (value: T) => void
}

const FilterChipInner = <T,>({
  active,
  label,
  value,
  color,
  onPress,
}: FilterChipProps<T>) => {
  const handlePress = useCallback(() => {
    onPress(value)
  }, [onPress, value])

  const dotStyle = useMemo(() => {
    return color ? [styles.dot, { backgroundColor: color }] : styles.dot
  }, [color])

  styles.useVariants({
    active,
  })

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.chip}
      activeOpacity={0.85}
    >
      {color ? <View style={dotStyle} /> : <></>}
      <Text style={styles.chipText}>{label}</Text>
    </TouchableOpacity>
  )
}

const FilterChip = memo(FilterChipInner) as typeof FilterChipInner

const ModalCardsFilter: FC<Props> = ({ sheetRef, onDismiss }) => {
  const { setFilterCardsModal } = useActions()
  const { navigate } = useAppNavigation()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { aplication } = useAppSelector((store) => store.app)

  const [languages, setLanguages] = useState<AppLanguageType[]>([])
  const [statusSelect, setStatusSelect] = useState<StatusItem>('STUDY')
  const [limitSelect, setLimitSelect] = useState<CardsLimitValue>('ALL')

  const showVariantListOptions: SelectOption[] = useMemo(() => {
    return [
      {
        label: t('modal.modalCardsFilter.word_only'),
        value: 'word_only',
      },
      {
        label: t('modal.modalCardsFilter.translate_only'),
        value: 'translate_only',
      },
    ]
  }, [t])

  const [showVariantSelect, setShowVariantSelect] =
    useState<SelectOption | null>(() => showVariantListOptions[0])

  const limitOptions: { label: string; value: CardsLimitValue }[] = useMemo(
    () => [
      { label: t('modal.modalCardsFilter.limit_all'), value: 'ALL' },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
    ],
    [t]
  )

  const languagesOptions = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages)
      : []
  }, [aplication])

  const onSelectLanguages = (value: AppLanguageType[]) => {
    setLanguages(value)
  }

  const onSelectShowVariant = useCallback((v: SelectOption) => {
    setShowVariantSelect(v)
  }, [])

  const resetFilters = () => {
    setLanguages([])
    setStatusSelect('STUDY')
    setShowVariantSelect(showVariantListOptions[0])
    setLimitSelect('ALL')
  }

  const confirm = () => {
    setFilterCardsModal({
      status: statusSelect,
      languages: languages.map((it) => it.code),
      showVariant: showVariantSelect?.value as ShowVariantListVale,
      limit: limitSelect,
    })

    navigate(RoutesNames.cardsRepetition)
    onDismiss()
  }

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={resetFilters}
      title={t('modal.modalCardsFilter.title')}
      subtitle="Настрой режим повторения перед стартом"
      dynamicSizing={false}
      snapPoints={['90%']}
      scrollContentStyle={styles.scrollContent}
      footer={
        <View style={styles.btns}>
          <Button
            type="BORDER-TRANSPARENT"
            classes={{
              btn: [styles.btn, styles.cancel],
              textBtn: styles.cancelText,
            }}
            onPress={onDismiss}
          >
            {t('ui.cancel')}
          </Button>

          <Button
            classes={{
              btn: [styles.btn, styles.confirm],
              textBtn: styles.confirmText,
            }}
            onPress={confirm}
          >
            {t('ui.start')}
          </Button>
        </View>
      }
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('modal.modalCardsFilter.status')}
        </Text>
        <View style={styles.chips}>
          {tabsWords(t, theme).map((it) => {
            const active = statusSelect === it.status

            return (
              <FilterChip
                key={it.status}
                active={active}
                label={it.label}
                value={it.status}
                color={it.color}
                onPress={setStatusSelect}
              />
            )
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('modal.modalCardsFilter.show_variants')}
        </Text>

        <View style={styles.chips}>
          {showVariantListOptions.map((it) => {
            const active = it.value === showVariantSelect?.value
            return (
              <FilterChip
                key={it.value}
                active={active}
                label={it.label}
                value={it}
                onPress={onSelectShowVariant}
              />
            )
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('modal.modalCardsFilter.limit_title')}
        </Text>

        <View style={styles.chips}>
          {limitOptions.map((it) => {
            const active = it.value === limitSelect

            return (
              <FilterChip
                key={it.value}
                active={active}
                label={it.label}
                value={it.value}
                onPress={setLimitSelect}
              />
            )
          })}
        </View>
      </View>

      <MultiselectDropdown
        title={t('ui.language')}
        selects={languages}
        onSelects={onSelectLanguages}
        options={languagesOptions}
        labelField="nativeName"
        valueField="code"
        classes={{
          title: styles.titleSelect,
        }}
      />
    </BottomSheet>
  )
}

export default memo(ModalCardsFilter)
