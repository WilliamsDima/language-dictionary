import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { GOOGLE_WEB_CLIENT_ID } from '@env'

export const configureGoogleSignIn = (): void => {
  GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID })
}

export const signInWithGoogle = async (): Promise<string> => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  await GoogleSignin.signIn()

  const { idToken, accessToken } = await GoogleSignin.getTokens()

  if (!idToken) {
    throw new Error('Google Sign-In: missing idToken')
  }

  const credential = auth.GoogleAuthProvider.credential(idToken, accessToken)
  const userCredential = await auth().signInWithCredential(credential)

  return userCredential.user.getIdToken()
}

export const signOutFirebase = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut()
  } catch {
    // пользователь может быть уже разлогинен на стороне Google — не критично
  }

  await auth().signOut()
}
