import React, { FC, useCallback, useState } from 'react'
import { styles } from './ButtonGoogle.styles'
import Button from '@/shared/UI/Button/Button'
import GoogleIcon from '@/assets/icons/UI/google.svg'
import Text from '@/shared/UI/Text/Text'
import { ActivityIndicator, View } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'
import { useAuth } from '@/shared/hooks/useAuth'
import { toast } from '@/shared/UI/Toast/toast'

interface Props {}

const ButtonGoogle: FC<Props> = (props) => {
  const { t } = useTranslation()
  const { loginWithGoogle } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const onGoogleButtonPress = useCallback(async () => {
    setIsLoading(true)

    try {
      await loginWithGoogle()
    } catch (error) {
      console.log('Google error', error)

      toast.error('Не удалось войти через Google. Попробуйте снова.')
    } finally {
      setIsLoading(false)
    }
  }, [loginWithGoogle])

  return (
    <Button
      classes={{ btn: styles.btn }}
      isText={false}
      disabled={isLoading}
      onPress={onGoogleButtonPress}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{t('auth.googleBtn')}</Text>
        {isLoading ? <ActivityIndicator size="small" /> : <GoogleIcon />}
      </View>
    </Button>
  )
}

export default ButtonGoogle
