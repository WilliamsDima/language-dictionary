import NativeTextToSpeech from '@/shared/native/NativeTextToSpeech'

type Props = {
  text: string
  // код языка карточки (ILanguage.code / IItem.language), например 'en'
  lang: string
}

// ok — фраза поставлена на озвучку; остальное — причина, по которой
// озвучить не получилось (UI показывает по ней тост, без краша)
export type TextToSpeechResult =
  | 'ok'
  | 'no_engine'
  | 'lang_unavailable'
  | 'failed'

type TtsErrorLike = {
  code?: string
}

// ILanguage.code — двухбуквенный ISO 639-1, а TTS-движку нужна локаль
// BCP-47 с регионом, иначе для части языков (pt, zh, en) берётся случайный
// или вовсе недоступный голос. Неизвестные коды уходят в движок как есть —
// Android сам подберёт голос по одному языку
const TTS_LOCALES: Record<string, string> = {
  ar: 'ar-SA',
  be: 'be-BY',
  bg: 'bg-BG',
  cs: 'cs-CZ',
  da: 'da-DK',
  de: 'de-DE',
  el: 'el-GR',
  en: 'en-US',
  es: 'es-ES',
  et: 'et-EE',
  fi: 'fi-FI',
  fr: 'fr-FR',
  he: 'he-IL',
  hi: 'hi-IN',
  hr: 'hr-HR',
  hu: 'hu-HU',
  id: 'id-ID',
  it: 'it-IT',
  ja: 'ja-JP',
  ka: 'ka-GE',
  kk: 'kk-KZ',
  ko: 'ko-KR',
  lt: 'lt-LT',
  lv: 'lv-LV',
  nb: 'nb-NO',
  nl: 'nl-NL',
  no: 'nb-NO',
  pl: 'pl-PL',
  pt: 'pt-BR',
  ro: 'ro-RO',
  ru: 'ru-RU',
  sk: 'sk-SK',
  sr: 'sr-RS',
  sv: 'sv-SE',
  th: 'th-TH',
  tr: 'tr-TR',
  uk: 'uk-UA',
  vi: 'vi-VN',
  zh: 'zh-CN',
}

// код reject нативного модуля, см. src/shared/native/NativeTextToSpeech.ts
const LANG_UNAVAILABLE_CODE = 'lang_unavailable'

// промис инициализации движка — один на всё приложение; при ошибке
// сбрасывается, чтобы следующее нажатие попробовало снова (например,
// пользователь установил/включил TTS-движок, не перезапуская приложение)
const initHolder: { current: Promise<void> | null } = { current: null }

// счётчик остановок: фраза, которая ещё ждала инициализацию движка, после
// stopTextToSpeech не должна прозвучать (пользователь уже ушёл с экрана)
const stopCounter = { current: 0 }

const getErrorCode = (error: unknown): string | undefined =>
  typeof error === 'object' && error !== null
    ? (error as TtsErrorLike).code
    : undefined

export const toTtsLocale = (code: string): string => {
  const normalized = code.trim().replace('_', '-')
  const [language = '', region] = normalized.split('-')
  const lower = language.toLowerCase()

  if (region) {
    return `${lower}-${region.toUpperCase()}`
  }

  return TTS_LOCALES[lower] ?? lower
}

const ensureTtsReady = (): Promise<void> => {
  if (!initHolder.current) {
    // модуля нет (iOS, тесты без мока) — то же, что нет движка
    initHolder.current = (
      NativeTextToSpeech
        ? NativeTextToSpeech.init()
        : Promise.reject({ code: 'no_engine' })
    ).catch((error: unknown) => {
      initHolder.current = null
      throw error
    })
  }

  return initHolder.current
}

// останавливает текущую озвучку (уход с экрана и т.п.); ошибки игнорируем —
// если движок не поднялся, останавливать и так нечего
export const stopTextToSpeech = (): void => {
  stopCounter.current += 1

  if (!initHolder.current || !NativeTextToSpeech) {
    return
  }

  NativeTextToSpeech.stop().catch(() => undefined)
}

export const textToSpeech = async ({
  text,
  lang,
}: Props): Promise<TextToSpeechResult> => {
  const utterance = text.trim()

  if (!utterance) {
    return 'ok'
  }

  const stopsBeforeInit = stopCounter.current

  try {
    await ensureTtsReady()
  } catch {
    return 'no_engine'
  }

  if (stopCounter.current !== stopsBeforeInit) {
    return 'ok'
  }

  try {
    // нативный speak сам выставляет язык (только при смене локали) и
    // прерывает предыдущую фразу (QUEUE_FLUSH) — очередь не копится
    await NativeTextToSpeech?.speak(utterance, toTtsLocale(lang))
    return 'ok'
  } catch (error) {
    return getErrorCode(error) === LANG_UNAVAILABLE_CODE
      ? 'lang_unavailable'
      : 'failed'
  }
}
