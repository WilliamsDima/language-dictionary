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
        pressBehavior="close"
        style={styles.backdrop}
      />
    ),
    []
  )

  const header = useMemo(() => {
    if (!title && !subtitle) {
      return null
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerTextBlock}>
            {!!title && <Text style={styles.title}>{title}</Text>}
            {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {showClose && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <CloseIcon width={22} height={22} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }, [handleClosePress, showClose, subtitle, title])

  return (
    <BottomSheetModal
      ref={sheetRef}
      onChange={handleChange}
      stackBehavior="push"
      enablePanDownToClose
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
      {header}

      {variant === 'scroll' ? (
        <>
          <BottomSheetScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[styles.scrollContent, scrollContentStyle]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </BottomSheetScrollView>
          {footer}
        </>
      ) : (
        <BottomSheetView style={styles.content}>
          {children}
          {footer}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  )
}

export default BottomSheet
