import React, { FC, memo, useEffect, useState } from 'react'
import {
  Image,
  StyleProp,
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

  const [multiselectSelected, setMultiselect] = useState<string[]>([])

  useEffect(() => {
    if (selects) {
      setMultiselect(selects.map((it) => it[valueField] as string))
    }
  }, [selects, valueField])

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
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder || t('ui.select_placeholder')}
        value={multiselectSelected}
        search
        searchPlaceholder={t('ui.search') + '...'}
        onChange={(item) => {
          setMultiselect(item)
          onSelects?.(
            options?.filter((it) => item.includes(it[valueField] as any)) || []
          )
        }}
        renderItem={(item, active) => {
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
                {item[labelField]}
              </Text>
            </View>
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
