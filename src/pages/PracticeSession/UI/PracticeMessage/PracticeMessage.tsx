import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './PracticeMessage.styles'

type Props = {
  text: string
  onBack: () => void
}

// сессию не начать: под фильтр нет карточек или их меньше minCards режима
const PracticeMessage: FC<Props> = ({ text, onBack }) => {
  const { t } = useTranslation()

  const btnClasses = useMemo(() => ({ textBtn: styles.btnText }), [])

  return (
    <View style={styles.wrapper}>
      <LottieView
        source={require('../../../../widgets/MainList/model/empty-list-lottie.json')}
        style={styles.anim}
        autoPlay
        loop
      />

      <Text style={styles.text}>{text}</Text>

      <Button style={styles.btn} classes={btnClasses} onPress={onBack}>
        {t('practiceSession.back')}
      </Button>
    </View>
  )
}

export default memo(PracticeMessage)
