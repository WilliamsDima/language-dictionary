import React, { FC, memo, useMemo, useState } from 'react'
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { styles } from './Select.styles'
import DoneWhiteIcon from '@/assets/icons/UI/done-white-64.svg'
import ArrowDownIcon from '@/assets/icons/UI/arrow-down-green-64.svg'
import Text from '../Text/Text'
import { useRotateArrowAnim } from '@/shared/hooks/useRotateArrowAnim'
import OutsidePressHandler from 'react-native-outside-press'

/**
 * UI Select
 *
 * @format
 */

export type SelectOption = {
  value: string | number
  label: string
}

interface Props {
  onPress?: () => void
  multiselect?: boolean
  options?: SelectOption[]
  select?: SelectOption
  selects?: SelectOption[]
  onSelect?: (value: SelectOption) => void
  placeholder?: string
  title?: string
}

const Select: FC<Props> = (props) => {
  const {
    multiselect,
    select,
    selects,
    placeholder = 'не выбрано',
    title,
    options,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [heightList, setHeightList] = useState(0)

  const { getAnimationStyles } = useRotateArrowAnim(!isOpen)

  const textPlaceholder = useMemo(() => {
    if (multiselect && selects?.length) {
      return selects[0].label
    }

    if (!multiselect && select) {
      return select.label
    }

    return placeholder
  }, [placeholder, multiselect, select, selects])

  const onClose = () => {
    setIsOpen(false)
  }

  const onPress = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <View style={styles.container}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        style={[styles.btn, isOpen && styles.btnOpen]}
        onPress={onPress}
        activeOpacity={1}
      >
        <Text style={styles.label}>{textPlaceholder}</Text>

        <Animated.View style={getAnimationStyles()}>
          <ArrowDownIcon width={24} height={24} />
        </Animated.View>
      </TouchableOpacity>

      {isOpen && (
        <OutsidePressHandler
          onOutsidePress={onClose}
          style={[
            styles.optionContainer,
            { bottom: -heightList + 10 },
            !options?.length && styles.optionContainerEmpty,
          ]}
          onLayout={({ nativeEvent }) => {
            setHeightList(nativeEvent.layout.height)
          }}
        >
          {options?.length ? (
            options?.map((it) => {
              return (
                <TouchableOpacity key={it.value} style={styles.selectItem}>
                  <Text style={styles.label}>{it.label}</Text>
                </TouchableOpacity>
              )
            })
          ) : (
            <Text style={styles.textEmptyOptions}>нет опций</Text>
          )}
        </OutsidePressHandler>
      )}
    </View>
  )
}

export default memo(Select)
