import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { StyleProp, TextInput, TextStyle, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Text from '../Text/Text'
import { MultiSelect } from 'react-native-element-dropdown'
import { styles } from './MultiselectDropdown.styles'
import { useTranslation } from '@/shared/i18n/types'

interface Props {
  options?: any[]
  selects?: any[]
  onSelects?: (value: any[]) => void
  placeholder?: string
  title?: string
  classes?: {
    title?: StyleProp<TextStyle>
  }
  labelField: string
  valueField: string
}

type DropdownItemProps = {
  active: boolean
  iconUrl?: string
  label: string
}

const DropdownItem = memo(({ active, iconUrl, label }: DropdownItemProps) => {
  return (
    <View style={[styles.item, active && styles.itemActive]}>
      {!!iconUrl && <FastImage source={{ uri: iconUrl }} style={styles.icon} />}
      <Text
        style={[
          styles.selectedTextStyle,
          active && styles.selectedTextStyleActive,
        ]}
      >
        {label}
      </Text>
    </View>
  )
})

const MultiselectDropdown: FC<Props> = (props) => {
  const {
    selects,
    placeholder,
    onSelects,
    title,
    options,
    classes,
    labelField = 'label',
    valueField = 'value',
  } = props

  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const [multiselectSelected, setMultiselect] = useState<string[]>([])

  const selectedOptions = useMemo(() => {
    if (!options?.length || !multiselectSelected.length) {
      return []
    }

    return multiselectSelected
      .map((selectedValue) =>
        options.find((it) => (it[valueField] as string) === selectedValue)
      )
      .filter(Boolean)
  }, [multiselectSelected, options, valueField])

  useEffect(() => {
    if (selects) {
      setMultiselect(selects.map((it) => it[valueField] as string))
    }
  }, [selects, valueField])

  const renderInputSearch = useCallback(
    (onSearch: (text: string) => void) => {
      return (
        <TextInput
          style={styles.inputSearchStyle}
          placeholder={t('ui.search') + '...'}
          placeholderTextColor={theme.colors.palette.dark_placeholder}
          selectionColor={theme.colors.palette.primery}
          autoCorrect={false}
          onChangeText={onSearch}
        />
      )
    },
    [t, theme.colors.palette.dark_placeholder, theme.colors.palette.primery]
  )

  return (
    <View>
      {title ? (
        <Text style={[styles.title, classes?.title]}>{title}</Text>
      ) : (
        <></>
      )}

      <View style={styles.dropdownWrapper}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          containerStyle={styles.containerStyle}
          activeColor={theme.colors.palette.transparent}
          itemContainerStyle={styles.itemContainer}
          data={options || []}
          labelField={labelField}
          valueField={valueField}
          placeholder={
            selectedOptions.length
              ? ''
              : placeholder || t('ui.select_placeholder')
          }
          value={multiselectSelected}
          visibleSelectedItem={false}
          search
          searchPlaceholder={t('ui.search') + '...'}
          renderInputSearch={renderInputSearch}
          onChange={(item) => {
            setMultiselect(item)
            onSelects?.(
              options?.filter((it) => item.includes(it[valueField] as any)) ||
                []
            )
          }}
          renderItem={(item, active) => {
            return (
              <DropdownItem
                active={!!active}
                iconUrl={item.iconUrl}
                label={item[labelField]}
              />
            )
          }}
        />

        {selectedOptions.length ? (
          <View style={styles.selectedRow} pointerEvents="none">
            {selectedOptions.map((item) => (
              <View
                key={item[valueField] as string}
                style={styles.selectedStyle}
              >
                <Text numberOfLines={1} style={styles.textSelectedStyle}>
                  {item[labelField]}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  )
}

export default memo(MultiselectDropdown)
