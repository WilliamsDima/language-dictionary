import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import Button from '../Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './AnswerButtons.styles'

export type AnswerButtonsValue = 'remember' | 'dont_remember'

type Props = {
  // уже выбранный ответ — подсвечивается рамкой (повторное нажатие перезапишет)
  answer?: AnswerButtonsValue
  onRemember: () => void
  onDontRemember: () => void
}

// пара кнопок «Не помню» / «Помню» после переворота карточки — общая для
// задания дня и режима практики «Карточки»
const AnswerButtons: FC<Props> = ({ answer, onRemember, onDontRemember }) => {
  const { t } = useTranslation()

  styles.useVariants({ answer })

  const dontRememberClasses = useMemo(
    () => ({ textBtn: styles.textDontRemember }),
    []
  )
  const rememberClasses = useMemo(() => ({ textBtn: styles.textRemember }), [])

  return (
    <View style={styles.wrapper}>
      <Button
        style={styles.btnDontRemember}
        classes={dontRememberClasses}
        onPress={onDontRemember}
      >
        {t('cardsRepetition.dont_remember')}
      </Button>

      <Button
        style={styles.btnRemember}
        classes={rememberClasses}
        onPress={onRemember}
      >
        {t('cardsRepetition.remember')}
      </Button>
    </View>
  )
}

export default memo(AnswerButtons)
