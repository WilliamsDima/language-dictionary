import React, { FC } from 'react'
import { styles } from './ButtonVk.styles'
import Button from '@/shared/UI/Button/Button'
import VkIcon from '@/assets/icons/UI/vk-64.svg'
import Text from '@/shared/UI/Text/Text'
import { Alert, View } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'

interface Props {}

const ButtonVk: FC<Props> = () => {
  const { t } = useTranslation()

  const handleVKLogin = async () => {
    Alert.alert('Авторизация отключена', 'VK-вход временно недоступен.')
  }

  return (
    <>
      <Button
        classes={{ btn: styles.btn }}
        isText={false}
        onPress={handleVKLogin}
      >
        <View style={styles.content}>
          <Text style={styles.text}>{t('auth.vkBtn')}</Text>
          <VkIcon width={24} height={24} />
        </View>
      </Button>
    </>
  )
}

export default ButtonVk
