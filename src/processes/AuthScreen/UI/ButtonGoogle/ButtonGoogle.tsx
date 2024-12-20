import React, { FC, useEffect } from 'react'
import { styles } from './ButtonGoogle.styles'
import Button from '@/shared/UI/Button/Button'
import GoogleIcon from '@/assets/icons/UI/google.svg'
import Text from '@/shared/UI/Text/Text'
import { Alert, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { useActions } from '@/shared/hooks/useActions'

interface Props {}

const ButtonGoogle: FC<Props> = (props) => {
  const { setIsAuth } = useActions()
  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    // Alert.alert('onAuthStateChanged user', JSON.stringify(user))
    console.log('onAuthStateChanged user', user)

    setIsAuth(!!user)
  }

  const onGoogleButtonPress = async () => {
    // Alert.alert('onGoogleButtonPress')
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices()
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn()

      console.log('userInfo', userInfo)

      //Alert.alert('userInfo', JSON.stringify(userInfo))

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      )

      // console.log('googleCredential', googleCredential)

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential)
    } catch (error) {
      //Alert.alert('onGoogleButtonPress error', JSON.stringify(error))
      console.log('onGoogleButtonPress error', error)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <Button
      classes={{ btn: styles.btn }}
      isText={false}
      onPress={onGoogleButtonPress}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Войти с помощью Google</Text>
        <GoogleIcon />
      </View>
    </Button>
  )
}

export default ButtonGoogle
