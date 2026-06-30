import React, { FC, startTransition, useActionState, useCallback } from 'react'
import { styles } from './ButtonGoogle.styles'
import Button from '@/shared/UI/Button/Button'
import GoogleIcon from '@/assets/icons/UI/google.svg'
import Text from '@/shared/UI/Text/Text'
import { ActivityIndicator, View } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'
import { useAuth } from '@/shared/hooks/useAuth'
import { toast } from '@/shared/UI/Toast/toast'

interface Props {}

const ButtonGoogle: FC<Props> = () => {
  const { t } = useTranslation()
  const { loginWithGoogle } = useAuth()

  const [, loginAction, isLoading] = useActionState(
    async (_prevState: null) => {
      try {
        await loginWithGoogle()
      } catch (error) {
        console.log('Google error', error)
        toast.error('Не удалось войти через Google. Попробуйте снова.')
      }
      return null
    },
    null
  )

  const handlePress = useCallback(() => {
    startTransition(loginAction)
  }, [loginAction])

  return (
    <Button
      classes={{ btn: styles.btn }}
      isText={false}
      disabled={isLoading}
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={styles.text}>{t('auth.googleBtn')}</Text>
        {isLoading ? <ActivityIndicator size="small" /> : <GoogleIcon />}
      </View>
    </Button>
  )
}

export default ButtonGoogle
