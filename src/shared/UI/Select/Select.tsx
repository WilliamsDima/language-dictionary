import React, { FC, memo, useEffect, useState } from 'react'
import { StyleProp, TextStyle, View } from 'react-native'
import Text from '../Text/Text'
import { Dropdown } from 'react-native-element-dropdown'
import { styles } from './Select.styles'
import { SelectOption } from '../types'

interface Props {
  options?: SelectOption[]
  select?: SelectOption | null
  onSelect?: (value: SelectOption) => void
  placeholder?: string
  title?: string
  classes?: {
    title?: StyleProp<TextStyle>
  }
}

const Select: FC<Props> = (props) => {
  const {
    select,
    placeholder = 'не выбрано',
    title,
    onSelect,
    options,
    classes,
  } = props

  const [selected, setSelected] = useState<string>('')

  useEffect(() => {
    if (!selected && select) {
      setSelected(select.value as string)
    }
  }, [selected, select])

  return (
    <View>
      {!!title && <Text style={[styles.title, classes?.title]}>{title}</Text>}

      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
        data={options || []}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={selected}
        onChange={(item) => {
          setSelected(item.value)
          onSelect?.(item)
        }}
      />
    </View>
  )
}

export default memo(Select)
