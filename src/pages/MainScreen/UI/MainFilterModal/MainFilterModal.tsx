import React, { FC, useEffect, useMemo, useState } from 'react'
import { styles } from './MainFilterModal.styles'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Close from '@/assets/icons/UI/close-red-64.svg'
import Select from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import type { SelectOption } from '@/shared/UI/types'
import { useLazyGetItemsQuery } from '../../api/cardsServices'
import { useCardsContext } from '@/shared/hooks/useCardsContext'
import { COLORS } from '@/assets/styles/colors'
import type { IItem } from '@/entities/Item/model/item'
import { useTranslation } from '@/shared/i18n/types'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'

interface Props {}

const MainFilterModal: FC<Props> = () => {
  const { setShowFilterMain, setFilterMain } = useActions()
  const { t } = useTranslation()

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

  const { showFilterMain, filterMain, filterByStatus } = useAppSelector(
    (store) => store.items
  )

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

  const onClose = () => {
    setShowFilterMain(false)
  }

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
            }

            setLastVisible(res.data?.lastVisible)
            page.current = 1

            setSortDateValue(sortByDate[1])
            setLanguages([])
            setShowFilterMain(false)

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

  useEffect(() => {
    if (filterMain) {
      const dateValue = sortByDate.find(
        (it) => it?.value === filterMain?.sortDate
      )
      dateValue && setSortDateValue(dateValue)

      const langs = languagesOptions?.filter((it) => {
        return filterMain?.languages?.includes(it?.code)
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

          <View style={styles.bottom}>
            <Button
              classes={{ btn: [styles.btn, styles.btnCancel] }}
              onPress={onCancel}
            >
              {t('ui.reset')}
            </Button>
            <Button classes={{ btn: styles.btn }} onPress={onSubmit}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={COLORS.white} />
              ) : (
                t('ui.apply')
              )}
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default MainFilterModal
