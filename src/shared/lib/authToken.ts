import { appSecureStorage } from '@/shared/storage/mmkv.storage'
import { StorageKeys } from '@/shared/storage/storage.keys'

const tokenStore: { value: string | null } = { value: null }

export const getAuthToken = (): string | null => {
  if (tokenStore.value) return tokenStore.value

  const token = appSecureStorage.getString(StorageKeys.AUTH_TOKEN)
  if (token) tokenStore.value = token

  return token ?? null
}

export const setAuthToken = (token: string | null): void => {
  tokenStore.value = token

  if (token) {
    appSecureStorage.setString(StorageKeys.AUTH_TOKEN, token)
  } else {
    appSecureStorage.delete(StorageKeys.AUTH_TOKEN)
  }
}

export const clearAuthToken = (): void => setAuthToken(null)
