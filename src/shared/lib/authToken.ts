import auth from '@react-native-firebase/auth'

/**
 * Firebase ID tokens expire after ~1 hour. We must never persist one and
 * replay it later — always ask the Firebase SDK for the current token,
 * which transparently returns the cached token or refreshes it over the
 * network when it's expired/near expiry. Firebase itself persists the
 * signed-in session across app restarts, so there is nothing for us to
 * store separately.
 */
export const getAuthToken = async (): Promise<string | null> => {
  const currentUser = auth().currentUser
  if (!currentUser) return null

  return currentUser.getIdToken()
}
