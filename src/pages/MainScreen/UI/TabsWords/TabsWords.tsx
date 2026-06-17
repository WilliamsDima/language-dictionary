import React, { FC, useCallback, useMemo, useState } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './TabsWords.styles'
import { Animated, TouchableOpacity, View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { tabsWords } from '@/shared/helpers/tabsWord'
import type { StatusItem } from '@/entities/Item/model/item'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  activeStatus: StatusItem
  onChange: (status: StatusItem) => void
  scrollX: Animated.Value
  sliderWidth: number
}

type StatusTabProps = {
  color: string
  label: string
  onPress: () => void
}

const StatusTab = ({ color, label, onPress }: StatusTabProps) => {
  const circleStyle = useMemo(() => {
    return [styles.circle, { backgroundColor: color }]
  }, [color])

  return (
    <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.9}>
      <View style={circleStyle} />
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const TabsWords: FC<Props> = ({
  activeStatus,
  onChange,
  scrollX,
  sliderWidth,
}) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const [containerWidth, setContainerWidth] = useState(0)

  const tabs = useMemo(() => tabsWords(t, theme), [t, theme])
  const indicatorWidth = useMemo(() => {
    if (!containerWidth) {
      return 0
    }

    return (
      (containerWidth - theme.size.s8 - theme.size.s6 * (tabs.length - 1)) /
      tabs.length
    )
  }, [containerWidth, tabs.length, theme.size.s6, theme.size.s8])

  const indicatorStyle = useMemo(() => {
    return {
      width: indicatorWidth,
      transform: [
        {
          translateX: scrollX.interpolate({
            inputRange: tabs.map((_, index) => index * sliderWidth),
            outputRange: tabs.map(
              (_, index) =>
                theme.size.s4 + index * (indicatorWidth + theme.size.s6)
            ),
            extrapolate: 'clamp',
          }),
        },
      ],
    }
  }, [indicatorWidth, scrollX, sliderWidth, tabs, theme.size.s4, theme.size.s6])

  const onPressHandler = useCallback(
    (status: StatusItem) => {
      if (status !== activeStatus) {
        onChange(status)
      }
    },
    [activeStatus, onChange]
  )

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        setContainerWidth(event.nativeEvent.layout.width)
      }}
    >
      {indicatorWidth ? (
        <Animated.View style={[styles.activeBg, indicatorStyle]} />
      ) : (
        <></>
      )}

      {tabs.map((it) => {
        return (
          <StatusTab
            key={it.status}
            color={it.color}
            label={it.label}
            onPress={() => onPressHandler(it.status)}
          />
        )
      })}
    </View>
  )
}

export default TabsWords
