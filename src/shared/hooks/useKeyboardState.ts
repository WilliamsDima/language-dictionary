import React, { useState } from 'react'
import { Keyboard } from 'react-native'

const dismiss = () => Keyboard.dismiss()

const useKeyboardState = () => {
  const [isOpen, setIsOpen] = useState(false)
  React.useEffect(() => {
    const event_show = Keyboard.addListener('keyboardDidShow', () => {
      setIsOpen(true)
    })
    const event_hide = Keyboard.addListener('keyboardDidHide', () => {
      setIsOpen(false)
    })
    return () => {
      event_hide.remove()
      event_show.remove()
    }
  }, [])
  return { isOpen, dismiss }
}
export default useKeyboardState
