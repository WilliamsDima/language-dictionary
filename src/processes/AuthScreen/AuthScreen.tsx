import Layout from '@/shared/UI/Layout/Layout'
import React, { FC } from 'react'
import { Image, View } from 'react-native'
import ButtonGoogle from './UI/ButtonGoogle/ButtonGoogle'
import { styles } from './AuthScreen.styles'
import Text from '@/shared/UI/Text/Text'
import ButtonVk from './UI/ButtonVk/ButtonVk'
import { useAppSelector } from '@/shared/hooks/useStore'

const AuthScreen: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)
  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.content}>
          <Image source={require('../../assets/images/languages.png')} />

          <Text style={styles.title}>
            Авторизуйтесь, чтобы использовать приложение
          </Text>
        </View>

        <View style={styles.btns}>
          <ButtonGoogle />

          {!!aplication?.showVKAuth && <ButtonVk />}
        </View>
      </View>
    </Layout>
  )
}

export default AuthScreen
