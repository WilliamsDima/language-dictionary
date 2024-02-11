import Clipboard from '@react-native-clipboard/clipboard'

export const copyToClipboard = (text: string) => {
  try {
    Clipboard.setString(text)
  } catch (error) {
    console.log('copyToClipboard error', error)
  }
}
