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
  }, [t])

  const defaultSortDateValue = sortByDate[0]

  const [sortDateValue, setSortDateValue] =
    useState<SelectOption>(defaultSortDateValue)
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
      sortByDate.find((it) => it.value === filterMain?.sortDate) ??
      defaultSortDateValue
    setSortDateValue(sortOption)

    // коды, которых нет среди изучаемых языков (например, сохранённые ранее
    // ru/en языков интерфейса или удалённый из профиля язык), просто
    // отбрасываются — применение фильтра перезапишет их в сторе
    const selectedLanguages = filterMain?.languages ?? []
    setLanguages(
      selectedLanguages
        .map((code) => languagesOptions.find((lang) => lang.code === code))
        .filter((lang): lang is ILanguage => !!lang)
    )
  }, [defaultSortDateValue, filterMain, languagesOptions, sortByDate])

  const onChangeSheet = useCallback(
    (index: number) => {
      if (index === 0) {
        syncFromStore()
      }
    },
    [syncFromStore]
  )

  const onCancel = () => {
    setSortDateValue(defaultSortDateValue)
    setLanguages([])
  }

  const onSelectSortDate = (value: SelectOption) => {
    setSortDateValue(value)
  }

  const onSelectLanguages = (value: ILanguage[]) => {
    setLanguages(value)
  }

  const onSubmit = () => {
    setIsLoading(true)
    setFilterMain({
      sortDate: sortDateValue.value as 'asc' | 'desc',
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
          title={t('ui.sort_by_date')}
          select={sortDateValue}
          options={sortByDate}
          onSelect={onSelectSortDate}
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
