import React, { FC, memo, useMemo, useState } from 'react'
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { styles } from './Select.styles'
import DoneWhiteIcon from '@/assets/icons/UI/done-white-64.svg'
import ArrowDownIcon from '@/assets/icons/UI/arrow-down-green-64.svg'
import Text from '../Text/Text'
import { useRotateArrowAnim } from '@/shared/hooks/useRotateArrowAnim'
import OutsidePressHandler from 'react-native-outside-press'
import SelectDropdown from 'react-native-select-dropdown'

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
  onPress?: () => void
  multiselect?: boolean
  options?: SelectOption[]
  select?: SelectOption | null
  selects?: SelectOption[]
  onSelect?: (value: SelectOption) => void
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
    onSelect,
    classes,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [heightList, setHeightList] = useState(0)

  const [isonsError, setIsonsError] = useState<SelectOptionValue[]>([])

  const { getAnimationStyles } = useRotateArrowAnim(isOpen)

  const textPlaceholder = useMemo(() => {
    if (multiselect && selects?.length) {
      return selects.map((it) => it.label).join(', ')
    }

    if (!multiselect && select) {
      return select.label
    }

    return placeholder
  }, [placeholder, multiselect, select, selects])

  const onClose = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  const onPress = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <SelectDropdown
        data={options || []}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        renderButton={(selectedItem, isOpened) => {
          console.log(' renderButton selectedItem', selectedItem)

          return (
            <View style={[styles.container, classes?.container]}>
              {!!title && (
                <Text style={[styles.title, classes?.title]}>{title}</Text>
              )}
              <TouchableOpacity
                style={[styles.btn, isOpen && styles.btnOpen]}
                onPress={onPress}
                activeOpacity={1}
              >
                <Text
                  style={[styles.placeholder, isOpen && styles.placeholderOpen]}
                  numberOfLines={1}
                >
                  {textPlaceholder}
                </Text>

                <Animated.View style={getAnimationStyles()}>
                  <ArrowDownIcon width={24} height={24} />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )
        }}
        renderItem={(item, index, isSelected) => {
          const active = multiselect
            ? selects?.some((it) => it.value === item.value)
            : item.value === select?.value

          const iconIsError = isonsError.includes(item.value)
          return (
            <View
              style={styles.selectItem}
              // onPress={() => {
              //   onSelect && onSelect(it)
              //   !multiselect && onClose()
              // }}
              // activeOpacity={1}
            >
              {multiselect && (
                <View style={[styles.done, active && styles.doneActive]}>
                  {active && <DoneWhiteIcon width={15} height={15} />}
                </View>
              )}

              {!!item.iconUrl && !iconIsError && (
                <Image
                  style={styles.icon}
                  onError={() => {
                    setIsonsError((prev) => [...prev, item.value])
                  }}
                  source={{ uri: item.iconUrl }}
                />
              )}
              <Text style={[styles.label, active && styles.labelActive]}>
                {item.label}
              </Text>
            </View>
          )
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{
          width: 200,
          height: 50,
          backgroundColor: '#E9ECEF',
          borderRadius: 12,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}
      />

      {/* <Text style={styles.textEmptyOptions}>нет опций</Text> */}
    </>
  )
}

export default memo(Select)
