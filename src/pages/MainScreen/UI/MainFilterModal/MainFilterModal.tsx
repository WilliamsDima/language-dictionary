import React, { FC, RefObject, useEffect, useMemo, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './MainFilterModal.styles'
import { ActivityIndicator, View } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Select from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import type { SelectOption } from '@/shared/UI/types'
import { useLazyGetItemsQuery } from '../../api/cardsServices'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import type { IItem } from '@/entities/Item/model/item'
import { useTranslation } from '@/shared/i18n/types'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

interface Props {
  sheetRef: RefObject<BottomSheetModal | null>
  onClose: () => void
}

const MainFilterModal: FC<Props> = ({ sheetRef, onClose }) => {
  const { setFilterMain, setItems } = useActions()
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

  const { filterMain, filterByStatus } = useAppSelector((store) => store.items)

  const { firebaseData } = useAppSelector((store) => store.user)

  const [sortDateValue, setSortDateValue] = useState<SelectOption>(
    sortByDate[1]
  )
  const [languages, setLanguages] = useState<AppLanguageType[]>([])

  const languagesOptions = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages)
      : []
  }, [aplication])

  const { page, isLoading, setAllItems, setLastVisible, setIsLoading } =
    useCardsContext()

  const [getItems] = useLazyGetItemsQuery()

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
    if (firebaseData) {
      const sendData = {
        uid: firebaseData?.uid,
        filter: {
          status: filterByStatus,
          filter: {
            sortDate: sortDateValue?.value as any,
            languages: languages.map((it) => it.code),
          },
        },
        limitCount: 10,
        page: 1,
      }

      getItems(sendData)
        .then((res) => {
          if (res.data?.items) {
            if (res.data?.items) {
              const obj: Record<number, IItem> = {}

              res.data?.items.forEach((it) => {
                obj[it.id] = it
              })

              setAllItems(obj)
              setItems(obj)
            }

            setLastVisible(res.data?.lastVisible)
            page.current = 1

            setSortDateValue(sortByDate[1])
            setLanguages([])
            onClose()

            setFilterMain({
              sortDate: sortDateValue?.value as any,
              languages: languages.map((it) => it.code),
            })
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onClose={onClose}
      title="Фильтр карточек"
      subtitle="Подбери карточки под текущую сессию"
      variant="view"
      dynamicSizing
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
