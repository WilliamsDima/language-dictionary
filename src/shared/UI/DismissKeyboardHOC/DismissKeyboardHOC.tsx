import React, { FC } from 'react'
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native'

/**
 * HOC который позволяте скрывать клавиатуру при клики вне её
 *
 * @format
 */

const DismissKeyboardHOC = (Comp: FC | typeof View) => {
  return ({ children, ...props }: any) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  )
}

export const DismissKeyboardView = DismissKeyboardHOC(View)
