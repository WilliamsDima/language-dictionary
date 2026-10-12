import { beforeEach, describe, expect, it, jest } from '@jest/globals'

const mockTts = {
  init: jest.fn<() => Promise<void>>(),
  speak: jest.fn<(text: string, locale: string) => Promise<void>>(),
  stop: jest.fn<() => Promise<void>>(),
}

jest.mock('../native/NativeTextToSpeech', () => ({
  __esModule: true,
  default: mockTts,
}))

type TextToSpeechModule = typeof import('./textToSpeech')

// модуль держит состояние (инициализация движка) на уровне файла — для
// каждого теста берём свежий экземпляр
const loadModule = (): TextToSpeechModule => {
  const holder: { current: TextToSpeechModule | null } = { current: null }
  jest.isolateModules(() => {
    holder.current = require('./textToSpeech') as TextToSpeechModule
  })
  return holder.current as TextToSpeechModule
}

describe('toTtsLocale', () => {
  it('должен маппить код языка в локаль BCP-47 с регионом', () => {
    const { toTtsLocale } = loadModule()

    expect(toTtsLocale('en')).toBe('en-US')
    expect(toTtsLocale('DE')).toBe('de-DE')
    expect(toTtsLocale('zh')).toBe('zh-CN')
  })

  it('должен сохранять явно заданный регион и нормализовать регистр', () => {
    const { toTtsLocale } = loadModule()

    expect(toTtsLocale('en_gb')).toBe('en-GB')
    expect(toTtsLocale('pt-PT')).toBe('pt-PT')
  })

  it('должен отдавать неизвестный код как есть', () => {
    const { toTtsLocale } = loadModule()

    expect(toTtsLocale('eo')).toBe('eo')
  })
})

describe('textToSpeech', () => {
  beforeEach(() => {
    mockTts.init.mockReset().mockResolvedValue(undefined)
    mockTts.speak.mockReset().mockResolvedValue(undefined)
    mockTts.stop.mockReset().mockResolvedValue(undefined)
  })

  it('должен озвучивать слово в локали языка карточки', async () => {
    const { textToSpeech } = loadModule()

    await expect(textToSpeech({ text: ' house ', lang: 'en' })).resolves.toBe(
      'ok'
    )
    expect(mockTts.speak).toHaveBeenCalledWith('house', 'en-US')
  })

  it('не должен трогать движок для пустой строки', async () => {
    const { textToSpeech } = loadModule()

    await expect(textToSpeech({ text: '  ', lang: 'en' })).resolves.toBe('ok')
    expect(mockTts.init).not.toHaveBeenCalled()
    expect(mockTts.speak).not.toHaveBeenCalled()
  })

  it('должен возвращать no_engine и повторять инициализацию при следующем вызове', async () => {
    const { textToSpeech } = loadModule()
    mockTts.init.mockRejectedValueOnce({ code: 'no_engine' })

    await expect(textToSpeech({ text: 'house', lang: 'en' })).resolves.toBe(
      'no_engine'
    )
    expect(mockTts.speak).not.toHaveBeenCalled()

    await expect(textToSpeech({ text: 'house', lang: 'en' })).resolves.toBe(
      'ok'
    )
    expect(mockTts.init).toHaveBeenCalledTimes(2)
  })

  it('должен инициализировать движок один раз', async () => {
    const { textToSpeech } = loadModule()

    await textToSpeech({ text: 'one', lang: 'en' })
    await textToSpeech({ text: 'zwei', lang: 'de' })

    expect(mockTts.init).toHaveBeenCalledTimes(1)
    expect(mockTts.speak).toHaveBeenLastCalledWith('zwei', 'de-DE')
  })

  it('должен возвращать lang_unavailable, если голоса для языка нет', async () => {
    const { textToSpeech } = loadModule()
    mockTts.speak.mockRejectedValueOnce({ code: 'lang_unavailable' })

    await expect(textToSpeech({ text: 'Haus', lang: 'de' })).resolves.toBe(
      'lang_unavailable'
    )
  })

  it('должен возвращать failed при прочих ошибках синтеза', async () => {
    const { textToSpeech } = loadModule()
    mockTts.speak.mockRejectedValueOnce({ code: 'failed' })

    await expect(textToSpeech({ text: 'house', lang: 'en' })).resolves.toBe(
      'failed'
    )
  })
})

describe('stopTextToSpeech', () => {
  beforeEach(() => {
    mockTts.init.mockReset().mockResolvedValue(undefined)
    mockTts.speak.mockReset().mockResolvedValue(undefined)
    mockTts.stop.mockReset().mockResolvedValue(undefined)
  })

  it('не должен трогать движок, если он ещё не инициализирован', () => {
    const { stopTextToSpeech } = loadModule()

    stopTextToSpeech()

    expect(mockTts.stop).not.toHaveBeenCalled()
  })

  it('должен останавливать речь после инициализации', async () => {
    const { stopTextToSpeech, textToSpeech } = loadModule()

    await textToSpeech({ text: 'house', lang: 'en' })
    stopTextToSpeech()

    expect(mockTts.stop).toHaveBeenCalledTimes(1)
  })
})
