import { appStorage } from '../storage/mmkv.storage'

export async function getAsyncLocal(
  key: string,
  skipError?: boolean
): Promise<any | undefined> {
  if (key === null || key === undefined) {
    throw new Error('Key is not provided')
  }

  if (skipError) {
    const res = appStorage.getString(key)
    return res ? JSON.parse(res) : undefined
  } else {
    try {
      const res = appStorage.getString(key)
      if (!res) {
        throw new Error(`There is no such key as ${key}`)
      }

      // Если ключ найден, пытаемся распарсить JSON
      try {
        return res ? JSON.parse(res) : undefined
      } catch (e) {
        // Здесь выбрасываем SyntaxError
        throw new SyntaxError('Invalid JSON format')
      }
    } catch (e) {
      console.log('LOCAL CLIENT get ERROR', e)
      throw e
    }
  }
}

export async function setAsyncLocal(
  key: string,
  value: any
): Promise<void | undefined> {
  try {
    const serialized = JSON.stringify(value)
    appStorage.setString(key, serialized)
  } catch (e) {
    console.log('LOCAL CLIENT set ERROR', e)
  }
}

export async function clearAsyncLocal(): Promise<void | undefined> {
  try {
    appStorage.clearAll()
  } catch (e) {
    console.log('LOCAL CLIENT clear ERROR', e)
  }
}

export async function removeAsyncLocal(key: string): Promise<void | undefined> {
  try {
    appStorage.delete(key)
  } catch (e) {
    console.log('LOCAL CLIENT remove ERROR', e)
  }
}
