import DeviceInfo from 'react-native-device-info'
import Tts from 'react-native-tts'
import { IS_IOS } from './ScaleUtils'

type Props = {
  text: string
  lang: string
}

export const textToSpeech = async ({ text, lang }: Props) => {
  const appId = DeviceInfo.getBundleId()

  const voices = await Tts.voices() // Просмотр доступных голосов

  const matchedVoice = voices.find((voice) => voice.language.startsWith(lang))

  Tts.setDefaultRate(0.5) // Скорость речи
  Tts.setDefaultPitch(1.0) // Высота тона

  if (matchedVoice) {
    Tts.setDefaultVoice(matchedVoice.id) // выбранная озвучка
    Tts.setDefaultLanguage(matchedVoice.language) // язык озвучки
  }

  if (IS_IOS) {
    // IOS
    Tts.speak(text, {
      iosVoiceId: appId,
      rate: 0.5,
    })
  } else {
    // Android
    Tts.speak(text, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    })
  }
}
