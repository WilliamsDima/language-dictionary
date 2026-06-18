import React, { FC, RefObject, useMemo, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './MainFilterModal.styles'
import { ActivityIndicator, View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Select from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import type { SelectOption } from '@/shared/UI/types'
import { useTranslation } from '@/shared/i18n/types'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface Props {
  sheetRef: RefObject<BottomSheetModal | null>
}

const MainFilterModal: FC<Props> = ({ sheetRef }) => {
  const { setFilterMain } = useActions()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { appLanguage, aplication } = useAppSelector((store) => store.app)

  const sortByDate: SelectOption[] = useMemo(() => {
    return [
      {
        label: t('ui.desc'),
        value: 'desc',
      },
      {
        label: t('ui.asc'),
        value: 'asc',
      },
    ]
  }, [appLanguage, t])

  const [sortDateValue, setSortDateValue] = useState<SelectOption>(
    sortByDate[1]
  )
  const [languages, setLanguages] = useState<AppLanguageType[]>([])

  const languagesOptions = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages)
      : []
  }, [aplication])

  const [isLoading, setIsLoading] = useState(false)

  const onCancel = () => {
    setSortDateValue(sortByDate[1])
    setLanguages([])
  }

  const onSelectSortDate = (value: SelectOption) => {
    setSortDateValue(value)
  }

  const onSelectLanguages = (value: AppLanguageType[]) => {
    setLanguages(value)
  }

  const onSubmit = () => {
    setIsLoading(true)
    setFilterMain({
      sortDate: sortDateValue.value as 'asc' | 'desc',
      languages: languages.map((it) => it.code),
    })
    setSortDateValue(sortByDate[1])
    setLanguages([])
    sheetRef.current?.dismiss()
    setIsLoading(false)
  }

  return (
    <BottomSheet
      sheetRef={sheetRef}
      title="Фильтр карточек"
      subtitle="Подбери карточки под текущую сессию"
      dynamicSizing={false}
      snapPoints={['52%']}
      scrollContentStyle={styles.scrollContent}
      footer={
        <View style={styles.bottom}>
          <Button
            classes={{
              btn: [styles.btn, styles.btnCancel],
              textBtn: styles.btnCancelText,
            }}
            onPress={onCancel}
          >
            {t('ui.reset')}
          </Button>
          <Button
            classes={{ btn: styles.btn, textBtn: styles.btnSubmitText }}
            onPress={onSubmit}
          >
            {isLoading ? (
              <ActivityIndicator
                size={'small'}
                color={theme.colors.palette.white}
              />
            ) : (
              t('ui.apply')
            )}
          </Button>
        </View>
      }
    >
      <View style={styles.options}>
        <Select
          title={t('ui.sort_by_date')}
          select={sortDateValue}
          options={sortByDate}
          onSelect={onSelectSortDate}
        />

        <MultiselectDropdown
          title={t('ui.language')}
          selects={languages}
          labelField="nativeName"
          valueField="code"
          onSelects={onSelectLanguages}
          options={languagesOptions}
          placeholder={t('ui.language_selection')}
        />
      </View>
    </BottomSheet>
  )
}

export default MainFilterModal
