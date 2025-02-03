import React, { FC, useEffect, useState } from 'react'
import { styles } from './MainFilterModal.styles'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Close from '@/assets/icons/UI/close-red-64.svg'
import Select from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import { languagesOptions } from '@/shared/json/languages'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import { SelectOption } from '@/shared/UI/types'
import { useLazyGetItemsQuery } from '../../api/cardsServices'
import { useCards } from '@/shared/hooks/useCards'
import { COLORS } from '@/assets/styles/colors'

interface Props {}

const sortByDate: SelectOption[] = [
  {
    label: 'По убыванию',
    value: 'desc',
  },
  {
    label: 'По возрастанию',
    value: 'asc',
  },
]

const MainFilterModal: FC<Props> = () => {
  const { setShowFilterMain, setFilterMain } = useActions()
  const { showFilterMain, filterMain, filterByStatus } = useAppSelector(
    (store) => store.items
  )

  const { firebaseData } = useAppSelector((store) => store.user)

  const [sortDateValue, setSortDateValue] = useState<null | SelectOption>(null)
  const [languages, setLanguages] = useState<SelectOption[]>([])

  const { page, isLoading, setAllItems, setLastVisible, setIsLoading } =
    useCards()

  const [getItems] = useLazyGetItemsQuery()

  const onClose = () => {
    setShowFilterMain(false)
  }

  const onCancel = () => {
    setSortDateValue(null)
    setLanguages([])
  }

  const onSelectSortDate = (value: SelectOption) => {
    setSortDateValue(value)
  }

  const onSelectLanguages = (value: SelectOption[]) => {
    setLanguages(value)
  }

  const onSubmit = () => {
    setIsLoading(true)
    if (firebaseData) {
      getItems({
        uid: firebaseData?.uid,
        filter: {
          status: filterByStatus,
          search: '',
          filter: {
            sortDate: sortDateValue?.value as any,
            languages: languages.map((it) => +it.value),
          },
        },
        limitCount: 10,
        page: 1,
      })
        .then((res) => {
          if (res.data?.items) {
            setAllItems(res.data?.items)
            setLastVisible(res.data?.lastVisible)
            page.current = 1

            setSortDateValue(null)
            setLanguages([])
            setShowFilterMain(false)
            setFilterMain({
              sortDate: sortDateValue?.value as any,
              languages: languages.map((it) => +it.value),
            })
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    if (filterMain) {
      setSortDateValue(
        sortByDate.find((it) => it?.value === filterMain?.sortDate) || null
      )

      const langs = languagesOptions?.filter((it) => {
        return filterMain?.languages?.includes(+it?.value)
      })

      setLanguages(langs)
    }
  }, [filterMain, showFilterMain])

  return (
    <Modal visible={showFilterMain} onRequestClose={onClose} transparent>
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity style={styles.content} activeOpacity={1}>
          <View style={styles.top}>
            <TouchableOpacity onPress={onClose}>
              <Close width={25} height={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.options}>
            <Select
              title="Сортировка по дате"
              select={sortDateValue}
              options={sortByDate}
              onSelect={onSelectSortDate}
            />

            <MultiselectDropdown
              title="Язык"
              selects={languages}
              onSelects={onSelectLanguages}
              options={languagesOptions}
              placeholder="Выбор языка"
            />
          </View>

          <View style={styles.bottom}>
            <Button
              classes={{ btn: [styles.btn, styles.btnCancel] }}
              onPress={onCancel}
            >
              Сбросить
            </Button>
            <Button classes={{ btn: styles.btn }} onPress={onSubmit}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={COLORS.white} />
              ) : (
                'Применить'
              )}
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default MainFilterModal
