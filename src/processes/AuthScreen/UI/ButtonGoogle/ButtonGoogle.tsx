import React, { FC } from 'react'
import { styles } from './ButtonGoogle.styles'
import Button from '@/shared/UI/Button/Button'
import GoogleIcon from '@/assets/icons/UI/google.svg'
import Text from '@/shared/UI/Text/Text'
import { Alert, View } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'

interface Props {}

const ButtonGoogle: FC<Props> = (props) => {
  const { t } = useTranslation()

  const onGoogleButtonPress = async () => {
    Alert.alert('Firebase отключен', 'Google-вход временно недоступен.')
  }

  return (
    <Button
      classes={{ btn: styles.btn }}
      isText={false}
      onPress={onGoogleButtonPress}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{t('auth.googleBtn')}</Text>
        <GoogleIcon />
      </View>
    </Button>
  )
}

export default ButtonGoogle
