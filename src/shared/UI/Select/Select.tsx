import React, { FC, memo, useMemo, useState } from 'react'
import {
  Animated,
  Image,
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
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
    scroll?: StyleProp<ViewStyle>
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
    <View style={styles.container}>
      {!!title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        style={[styles.btn, isOpen && styles.btnOpen]}
        onPress={onPress}
        activeOpacity={1}
      >
        <Text style={styles.label} numberOfLines={1}>
          {textPlaceholder}
        </Text>

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
          <ScrollView
            style={classes?.scroll}
            showsVerticalScrollIndicator={false}
          >
            {options?.length ? (
              options?.map((it) => {
                const active = multiselect
                  ? selects?.some((item) => item.value === it.value)
                  : it.value === select?.value

                const iconIsError = isonsError.includes(it.value)

                return (
                  <TouchableOpacity
                    key={it.value}
                    style={styles.selectItem}
                    onPress={() => {
                      onSelect && onSelect(it)
                      !multiselect && onClose()
                    }}
                  >
                    {multiselect && (
                      <View style={[styles.done, active && styles.doneActive]}>
                        {active && <DoneWhiteIcon width={15} height={15} />}
                      </View>
                    )}

                    {!!it.iconUrl && !iconIsError && (
                      <Image
                        style={styles.icon}
                        onError={(error) => {
                          setIsonsError((prev) => [...prev, it.value])
                        }}
                        source={{ uri: it.iconUrl }}
                      />
                    )}
                    <Text style={[styles.label, active && styles.labelActive]}>
                      {it.label}
                    </Text>
                  </TouchableOpacity>
                )
              })
            ) : (
              <Text style={styles.textEmptyOptions}>нет опций</Text>
            )}
          </ScrollView>
        </OutsidePressHandler>
      )}
    </View>
  )
}

export default memo(Select)
