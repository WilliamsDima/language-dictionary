import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  TextToSpeechResult,
  stopTextToSpeech,
  textToSpeech,
} from '@/shared/helpers/textToSpeech'
import type { I18NKeys } from '@/shared/i18n/types'
import { getTtsHintKey } from '../model/listening'

// озвучка слова вопроса: один раз при показе и по кнопке повтора. Вопрос
// монтируется заново на каждый шаг, поэтому остановка при размонтировании
// покрывает и переход к следующему вопросу, и уход с экрана. Ошибка — не тост,
// а подсказка на экране: иначе без голоса тост всплывал бы на каждом вопросе
export const useWordSpeech = (text: string, lang: string) => {
  const [result, setResult] = useState<TextToSpeechResult>('ok')

  const hintKey = useMemo<I18NKeys | null>(() => getTtsHintKey(result), [result])

  const speak = useCallback(async () => {
    setResult(await textToSpeech({ text, lang }))
  }, [lang, text])

  useEffect(() => {
    speak()

    return stopTextToSpeech
  }, [speak])

  return { speak, hintKey }
}
