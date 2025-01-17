import React, { FC, memo, useEffect, useState } from 'react'
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Text from '../Text/Text'
import { MultiSelect } from 'react-native-element-dropdown'
import { styles } from './Select.styles'

/**
 * UI Select
 *
 * @format
 */

export type SelectOptionValue = string | number

export type SelectOption = {
  value: SelectOptionValue
  label: string
  iconUrl?: string
}

interface Props {
  multiselect?: boolean
  options?: SelectOption[]
  select?: SelectOption | null
  selects?: SelectOption[]
  onMultiSelect?: (value: SelectOption[]) => void
  placeholder?: string
  title?: string
  classes?: {
    container?: StyleProp<ViewStyle>
    scroll?: StyleProp<ViewStyle>
    title?: StyleProp<TextStyle>
  }
}

const Select: FC<Props> = (props) => {
  const {
    multiselect,
    select,
    selects,
    placeholder = 'не выбрано',
    title,
    options,
    onMultiSelect,
    classes,
  } = props

  const [multiselectSelected, setMultiselect] = useState<string[]>([])

  useEffect(() => {
    if (!multiselectSelected.length && selects?.length) {
      setMultiselect(selects.map((it) => it.value as string))
    }
  }, [multiselectSelected, selects])

  return (
    <View>
      {!!title && <Text style={[styles.title, classes?.title]}>{title}</Text>}

      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        data={options || []}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={multiselectSelected}
        search
        searchPlaceholder="Поиск..."
        onChange={(item) => {
          setMultiselect(item)
          onMultiSelect?.(
            options?.filter((it) => item.includes(it.value as any)) || []
          )
        }}
        renderItem={(item: SelectOption, active) => {
          return (
            <View style={[styles.item, active && styles.itemActive]}>
              {!!item.iconUrl && (
                <Image source={{ uri: item.iconUrl }} style={styles.icon} />
              )}

              <Text
                style={[
                  styles.selectedTextStyle,
                  active && styles.selectedTextStyleActive,
                ]}
              >
                {item.label}
              </Text>
            </View>
          )
        }}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default memo(Select)
