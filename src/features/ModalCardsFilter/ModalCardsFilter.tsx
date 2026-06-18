import React, { FC, memo, RefObject, useMemo, useState } from 'react'
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
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
}

type FilterOptionRowProps = {
  active: boolean
  label: string
  onPress: () => void
}

const FilterOptionRow = memo(
  ({ active, label, onPress }: FilterOptionRowProps) => {
    styles.useVariants({
      circleActive: active,
    })

    return (
      <TouchableOpacity onPress={onPress} style={styles.selectBtn}>
        <View style={styles.circle} />
        <Text style={styles.selectBtnText}>{label}</Text>
      </TouchableOpacity>
    )
  }
)

const ModalCardsFilter: FC<Props> = ({ sheetRef }) => {
  const { setFilterCardsModal } = useActions()
  const { navigate } = useAppNavigation()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { aplication, appLanguage } = useAppSelector((store) => store.app)

  const [languages, setLanguages] = useState<AppLanguageType[]>([])
  const [statusSelect, setStatusSelect] = useState<StatusItem>('STUDY')

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
  }, [appLanguage, t])

  const [showVariantSelect, setShowVariantSelect] =
    useState<SelectOption | null>(() => showVariantListOptions[0])

  const languagesOptions = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages)
      : []
  }, [aplication])

  const onSelectLanguages = (value: AppLanguageType[]) => {
    setLanguages(value)
  }

  const onSelectShowVariant = (v: SelectOption) => {
    setShowVariantSelect(v)
  }

  const resetFilters = () => {
    setLanguages([])
    setStatusSelect('STUDY')
    setShowVariantSelect(showVariantListOptions[0])
  }

  const onCancelHandler = () => {
    sheetRef.current?.dismiss()
  }

  const confirm = () => {
    setFilterCardsModal({
      status: statusSelect,
      languages: languages.map((it) => it.code),
      showVariant: showVariantSelect?.value as ShowVariantListVale,
    })

    navigate(RoutesNames.cardsRepetition)
    sheetRef.current?.dismiss()
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
            onPress={onCancelHandler}
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
        <Text style={styles.sectionTitle}>Статус карточек</Text>
        <View style={styles.selects}>
          {tabsWords(t, theme).map((it) => {
            const active = statusSelect === it.status

            return (
              <FilterOptionRow
                key={it.status}
                active={active}
                label={it.label}
                onPress={() => {
                  setStatusSelect(it.status)
                }}
              />
            )
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t('modal.modalCardsFilter.show_variants')}
        </Text>

        {showVariantListOptions.map((it) => {
          const active = it.value === showVariantSelect?.value
          return (
            <FilterOptionRow
              key={it.value}
              active={active}
              label={it.label}
              onPress={() => {
                onSelectShowVariant(it)
              }}
            />
          )
        })}
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
