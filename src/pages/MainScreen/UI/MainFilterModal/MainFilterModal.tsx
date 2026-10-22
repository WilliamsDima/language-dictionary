import React, { FC, RefObject, useCallback, useMemo, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './MainFilterModal.styles'
import { ActivityIndicator, View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Select from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import type { SelectOption } from '@/shared/UI/types'
import type { CardsSort } from '@/shared/store/slice/itemsSlice'
import { useTranslation } from '@/shared/i18n/types'
import { useMeProfile } from '@/shared/hooks/useMeProfile'
import type { ILanguage } from '@/shared/API/services/languages/types'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface Props {
  sheetRef: RefObject<BottomSheetModal | null>
}

const MainFilterModal: FC<Props> = ({ sheetRef }) => {
  const { setFilterMain } = useActions()
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { filterMain } = useAppSelector((store) => store.items)

  // одна сортировка за раз: по дате создания или по количеству слов в
  // карточке — бэкенд принимает одно значение `sort`
  const sortOptions: SelectOption[] = useMemo(() => {
    return [
      {
        label: t('ui.sort_date_desc'),
        value: 'date_desc',
      },
      {
        label: t('ui.sort_date_asc'),
        value: 'date_asc',
      },
      {
        label: t('ui.sort_items_desc'),
        value: 'items_desc',
      },
      {
        label: t('ui.sort_items_asc'),
        value: 'items_asc',
      },
    ]
  }, [t])

  // sortOptions мемоизирован — ссылка на первый вариант стабильна
  const defaultSortValue = sortOptions[0]

  const [sortValue, setSortValue] = useState<SelectOption>(defaultSortValue)
  const [languages, setLanguages] = useState<ILanguage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { data: profile } = useMeProfile()

  // изучаемые языки пользователя — карточки фильтруются по их code
  // (IItem.language), а не по языкам интерфейса
  const languagesOptions = useMemo(
    () => profile?.languages ?? [],
    [profile?.languages]
  )

  const syncFromStore = useCallback(() => {
    const sortOption =
      sortOptions.find((it) => it.value === filterMain?.sort) ??
      defaultSortValue
    setSortValue(sortOption)

    // коды, которых нет среди изучаемых языков (например, сохранённые ранее
    // ru/en языков интерфейса или удалённый из профиля язык), просто
    // отбрасываются — применение фильтра перезапишет их в сторе
    const selectedLanguages = filterMain?.languages ?? []
    setLanguages(
      selectedLanguages
        .map((code) => languagesOptions.find((lang) => lang.code === code))
        .filter((lang): lang is ILanguage => !!lang)
    )
  }, [defaultSortValue, filterMain, languagesOptions, sortOptions])

  const onChangeSheet = useCallback(
    (index: number) => {
      if (index === 0) {
        syncFromStore()
      }
    },
    [syncFromStore]
  )

  const onCancel = () => {
    setSortValue(defaultSortValue)
    setLanguages([])
  }

  const onSelectSort = (value: SelectOption) => {
    setSortValue(value)
  }

  const onSelectLanguages = (value: ILanguage[]) => {
    setLanguages(value)
  }

  const onSubmit = () => {
    setIsLoading(true)
    setFilterMain({
      sort: sortValue.value as CardsSort,
      languages: languages.map((it) => it.code),
    })
    sheetRef.current?.dismiss()
    setIsLoading(false)
  }

  return (
    <BottomSheet
      sheetRef={sheetRef}
      title={t('main.filter_title')}
      subtitle={t('main.filter_subtitle')}
      dynamicSizing={false}
      snapPoints={['90%']}
      scrollContentStyle={styles.scrollContent}
      onChange={onChangeSheet}
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
          title={t('ui.sort')}
          select={sortValue}
          options={sortOptions}
          onSelect={onSelectSort}
        />

        <MultiselectDropdown
          title={t('ui.language')}
          selects={languages}
          labelField="name"
          valueField="code"
          emojiField="emoji"
          onSelects={onSelectLanguages}
          options={languagesOptions}
          placeholder={t('ui.language_selection')}
        />
      </View>
    </BottomSheet>
  )
}

export default MainFilterModal
