import React, { FC, ReactNode, RefObject, useCallback, useMemo } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import type {
  BottomSheetBackdropProps,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet'
import { styles } from './BottomSheet.styles'
import CloseIcon from '@/assets/icons/UI/close-red-64.svg'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onDismiss?: () => void
  title?: string
  subtitle?: string
  showClose?: boolean
  // false — шторку нельзя закрыть пользователем: ни свайпом вниз, ни тапом
  // по фону, ни крестиком (кнопку «назад» Android блокирует вызывающий код)
  dismissible?: boolean
  children: ReactNode
  footer?: ReactNode
  snapPoints?: Array<string | number>
  dynamicSizing?: boolean
  variant?: 'scroll' | 'view'
  scrollRef?: RefObject<any>
  scrollContentStyle?: object
} & Omit<BottomSheetModalProps, 'children' | 'snapPoints' | 'onDismiss' | 'ref'>

const BottomSheet: FC<Props> = ({
  sheetRef,
  onDismiss,
  title,
  subtitle,
  showClose = true,
  dismissible = true,
  children,
  footer,
  snapPoints,
  dynamicSizing = true,
  variant = 'scroll',
  scrollRef,
  scrollContentStyle,
  onChange,
  ...rest
}) => {
  const handleChange = useCallback<
    NonNullable<BottomSheetModalProps['onChange']>
  >(
    (index, position, type) => {
      if (index === -1) {
        onDismiss?.()
      }

      onChange?.(index, position, type)
    },
    [onChange, onDismiss]
  )

  const handleClosePress = useCallback(() => {
    sheetRef.current?.dismiss()
  }, [sheetRef])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior={dismissible ? 'close' : 'none'}
        style={styles.backdrop}
      />
    ),
    [dismissible]
  )

  const header = useMemo(() => {
    if (!title && !subtitle) {
      return null
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTextBlock}>
            {title ? <Text style={styles.title}>{title}</Text> : <></>}
            {subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : (
              <></>
            )}
          </View>

          {showClose && dismissible ? (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <CloseIcon width={22} height={22} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    )
  }, [dismissible, handleClosePress, showClose, subtitle, title])

  // без футера низ прокручиваемого контента сам отступает от системной
  // навигации; футеры добавляют rt.insets.bottom в своих стилях
  const scrollContentContainerStyle = useMemo(
    () => [
      styles.scrollContent,
      footer ? undefined : styles.scrollContentSafe,
      scrollContentStyle,
    ],
    [footer, scrollContentStyle]
  )

  return (
    <BottomSheetModal
      ref={sheetRef}
      onChange={handleChange}
      stackBehavior="push"
      enablePanDownToClose={dismissible}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      containerStyle={styles.container}
      enableDynamicSizing={dynamicSizing}
      snapPoints={dynamicSizing ? undefined : snapPoints}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
      {...rest}
    >
      {variant === 'scroll' ? (
        <>
          {header}
          <BottomSheetScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={scrollContentContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </BottomSheetScrollView>
          {footer}
        </>
      ) : (
        // шапка внутри BottomSheetView — иначе enableDynamicSizing не учитывает
        // её высоту и шторка получается ниже контента (кнопки наезжают на текст)
        <BottomSheetView>
          {header}
          <View style={styles.content}>
            {children}
            {footer}
          </View>
        </BottomSheetView>
      )}
    </BottomSheetModal>
  )
}

export default BottomSheet
