import React, { FC, useEffect, useState } from 'react'
import { styles } from './MainFilterModal.styles'
import { TouchableOpacity, View } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import Close from '@/assets/icons/UI/close-red-64.svg'
import Select, { SelectOption } from '@/shared/UI/Select/Select'
import Button from '@/shared/UI/Button/Button'
import { languagesOptions } from '@/shared/json/languages'

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

const MainFilterModal: FC<Props> = (props) => {
  const { setShowFilterMain, setFilterMain } = useActions()
  const { showFilterMain, filterMain } = useAppSelector((store) => store.items)

  const [sortDateValue, setSortDateValue] = useState<null | SelectOption>(null)
  const [languages, setLanguages] = useState<SelectOption[]>([])

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

  const onSelectLanguages = (value: SelectOption) => {
    setLanguages((prev) => {
      const isLang = prev.some((it) => it.value === value.value)

      if (isLang) {
        return prev.filter((it) => it.value !== value.value)
      }

      return [...prev, value]
    })
  }

  const onSubmit = () => {
    setSortDateValue(null)
    setLanguages([])
    setShowFilterMain(false)
    setFilterMain({
      sortDate: sortDateValue?.value as any,
      languages: languages.map((it) => +it.value),
    })
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
              onSelect={onSelectSortDate}
              options={sortByDate}
            />

            <Select
              title="Язык"
              selects={languages}
              onSelect={onSelectLanguages}
              options={languagesOptions}
              multiselect
              classes={{ scroll: styles.scrollSelect }}
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
              Применить
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

export default MainFilterModal
