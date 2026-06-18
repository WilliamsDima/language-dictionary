import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'

export const useBottomSheet = (): [
  React.RefObject<BottomSheetModal | null>,
  () => void,
  () => void
] => {
  const sheetRef = useRef<BottomSheetModal>(null)

  const present = useCallback(() => {
    console.log(111)

    sheetRef.current?.present()
  }, [])

  const dismiss = useCallback(() => {
    sheetRef.current?.dismiss()
  }, [])

  return [sheetRef, present, dismiss]
}
