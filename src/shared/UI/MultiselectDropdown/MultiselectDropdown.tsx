import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import {
  Image,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
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
      {!!iconUrl && <Image source={{ uri: iconUrl }} style={styles.icon} />}
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
      {!!title ? (
        <Text style={[styles.title, classes?.title]}>{title}</Text>
      ) : (
        <></>
      )}

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
        placeholder={placeholder || t('ui.select_placeholder')}
        value={multiselectSelected}
        search
        searchPlaceholder={t('ui.search') + '...'}
        renderInputSearch={renderInputSearch}
        onChange={(item) => {
          setMultiselect(item)
          onSelects?.(
            options?.filter((it) => item.includes(it[valueField] as any)) || []
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
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item[labelField]}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default memo(MultiselectDropdown)
