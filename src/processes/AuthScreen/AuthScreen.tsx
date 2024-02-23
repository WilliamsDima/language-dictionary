import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useEffect } from 'react'
import { Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
  webClientId:
    '528679131313-9gmigp7vccosvokpsb7vcl5976j9nkb3.apps.googleusercontent.com',
})

const AuthScreen: FC = () => {
  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('user', user)
  }

  async function onGoogleButtonPress() {
    try {
      console.log('onGoogleButtonPress')
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices()
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn()

      console.log('userInfo', userInfo)

      // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      // console.log('googleCredential', googleCredential)

      // // Sign-in the user with the credential
      // return auth().signInWithCredential(googleCredential)
    } catch (error) {
      console.log('onGoogleButtonPress error', error)
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  return (
    <Layout>
      <Text style={{ color: 'red' }} onPress={onGoogleButtonPress}>
        AuthScreen
      </Text>
    </Layout>
  )
}

export default AuthScreen
