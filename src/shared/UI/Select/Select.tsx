import React, { FC, memo } from 'react'
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import Text from '../Text/Text'
import { Dropdown } from 'react-native-element-dropdown'
import { styles } from './Select.styles'
import { COLORS } from '@/assets/styles/colors'
import { useTranslation } from '@/shared/i18n/types'

interface Props {
  options?: any[]
  select?: any | null
  onSelect?: (value: any) => void
  placeholder?: string
  labelField?: string
  valueField?: string
  loading?: boolean
  title?: string
  classes?: {
    title?: StyleProp<TextStyle>
    wrapper?: StyleProp<ViewStyle>
    dropdown?: StyleProp<ViewStyle>
  }
  maxHeight?: number
}

const Select: FC<Props> = (props) => {
  const {
    select,
    placeholder,
    title,
    onSelect,
    options,
    classes,
    labelField = 'label',
    valueField = 'value',
    maxHeight = 300,
    loading,
  } = props
  const { t } = useTranslation()

  return (
    <View style={classes?.wrapper}>
      {!!title && <Text style={[styles.title, classes?.title]}>{title}</Text>}

      {!!loading && (
        <ActivityIndicator color={COLORS.primery} style={styles.loader} />
      )}

      <Dropdown
        style={[styles.dropdown, classes?.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        iconStyle={styles.iconStyle}
        data={options || []}
        maxHeight={maxHeight}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder || t('ui.select_placeholder')}
        value={select}
        onChange={(item) => {
          onSelect?.(item)
        }}
      />
    </View>
  )
}

export default memo(Select)
