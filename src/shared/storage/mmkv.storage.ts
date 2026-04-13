import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV({
  id: 'app-storage',
})

export const secureStorage = createMMKV({
  id: 'secure-storage',
  encryptionKey: 'your-secure-encryption-key-here',
})

export class MMKVStorage {
  constructor(private mmkv: ReturnType<typeof createMMKV>) {}

  getString(key: string): string | undefined {
    return this.mmkv.getString(key)
  }

  setString(key: string, value: string): void {
    this.mmkv.set(key, value)
  }

  getNumber(key: string): number | undefined {
    return this.mmkv.getNumber(key)
  }

  setNumber(key: string, value: number): void {
    this.mmkv.set(key, value)
  }

  getBoolean(key: string): boolean | undefined {
    return this.mmkv.getBoolean(key)
  }

  setBoolean(key: string, value: boolean): void {
    this.mmkv.set(key, value)
  }

  getObject<T>(key: string): T | null {
    try {
      const jsonString = this.mmkv.getString(key)
      return jsonString ? JSON.parse(jsonString) : null
    } catch {
      return null
    }
  }

  setObject<T>(key: string, value: T): void {
    this.mmkv.set(key, JSON.stringify(value))
  }

  getBuffer(key: string): ArrayBuffer | undefined {
    return this.mmkv.getBuffer(key)
  }

  setBuffer(key: string, value: ArrayBuffer): void {
    this.mmkv.set(key, value)
  }

  delete(key: string): void {
    this.mmkv.remove(key)
  }

  clearAll(): void {
    this.mmkv.clearAll()
  }

  contains(key: string): boolean {
    return this.mmkv.contains(key)
  }

  getAllKeys(): string[] {
    return this.mmkv.getAllKeys()
  }

  get size(): number {
    return this.mmkv.size
  }

  trim(): void {
    this.mmkv.trim()
  }

  recrypt(encryptionKey: string | undefined): void {
    this.mmkv.recrypt(encryptionKey)
  }

  getMMKV() {
    return this.mmkv
  }
}

export const appStorage = new MMKVStorage(storage)
export const appSecureStorage = new MMKVStorage(secureStorage)
