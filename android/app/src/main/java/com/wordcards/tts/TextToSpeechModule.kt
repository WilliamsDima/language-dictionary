package com.williamsdev.wordcards.tts

import android.media.AudioManager
import android.os.Bundle
import android.speech.tts.TextToSpeech
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.williamsdev.wordcards.specs.NativeTextToSpeechSpec
import java.util.Locale

/**
 * Озвучка слов карточек поверх системного android.speech.tts.TextToSpeech.
 * JS-спека: src/shared/native/NativeTextToSpeech.ts, обёртка:
 * src/shared/helpers/textToSpeech.ts. Коды reject различает обёртка:
 *  - no_engine — TTS-движка нет на устройстве / он не поднялся;
 *  - lang_unavailable — для локали нет голоса или его данных;
 *  - failed — прочий сбой синтеза.
 *
 * Методы TurboModule вызываются на потоке нативных модулей, а onInit движка
 * приходит на главном потоке, поэтому всё состояние — под одним lock.
 */
class TextToSpeechModule(reactContext: ReactApplicationContext) :
    NativeTextToSpeechSpec(reactContext) {

    private val lock = Any()

    private var engine: TextToSpeech? = null
    private var ready = false
    private val pendingInit = mutableListOf<Promise>()

    // onInit может прийти синхронно прямо из конструктора TextToSpeech
    // (например, движков нет вовсе) — до того, как engine присвоен
    private var constructing = false
    private var deferredInitStatus: Int? = null

    // локаль, уже выставленная в движке — не дёргаем setLanguage на каждое
    // слово одного языка
    private var currentLocale: Locale? = null
    private var utteranceCounter = 0L

    override fun init(promise: Promise) {
        synchronized(lock) {
            if (ready) {
                promise.resolve(null)
                return
            }

            pendingInit.add(promise)

            // инициализация уже идёт — промис резолвится вместе с первым
            if (engine != null || constructing) return

            try {
                constructing = true
                engine = TextToSpeech(reactApplicationContext) { status ->
                    onEngineInit(status)
                }
            } catch (e: Exception) {
                engine = null
            } finally {
                constructing = false
            }

            val status = deferredInitStatus
            deferredInitStatus = null

            when {
                engine == null -> handleInitStatus(TextToSpeech.ERROR)
                status != null -> handleInitStatus(status)
            }
        }
    }

    override fun speak(text: String, locale: String, promise: Promise) {
        synchronized(lock) {
            val tts = engine

            if (!ready || tts == null) {
                promise.reject(NO_ENGINE, "Text-to-speech engine is not initialized")
                return
            }

            try {
                val target = Locale.forLanguageTag(locale)

                if (target != currentLocale) {
                    if (!isLanguageResultOk(tts.isLanguageAvailable(target)) ||
                        !isLanguageResultOk(tts.setLanguage(target))
                    ) {
                        promise.reject(LANG_UNAVAILABLE, "No voice for locale $locale")
                        return
                    }

                    currentLocale = target
                }

                val params = Bundle().apply {
                    putInt(TextToSpeech.Engine.KEY_PARAM_STREAM, AudioManager.STREAM_MUSIC)
                    putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1f)
                }

                utteranceCounter += 1

                // QUEUE_FLUSH: новое нажатие обрывает предыдущую фразу, а не
                // копит очередь
                val result = tts.speak(
                    text,
                    TextToSpeech.QUEUE_FLUSH,
                    params,
                    "wordcards-$utteranceCounter"
                )

                if (result == TextToSpeech.SUCCESS) {
                    promise.resolve(null)
                } else {
                    promise.reject(FAILED, "TextToSpeech.speak returned $result")
                }
            } catch (e: Exception) {
                promise.reject(FAILED, e.message ?: "TextToSpeech.speak failed", e)
            }
        }
    }

    override fun stop(promise: Promise) {
        synchronized(lock) {
            try {
                if (ready) engine?.stop()
            } catch (e: Exception) {
                // нечего останавливать — не ошибка для вызывающего
            }

            promise.resolve(null)
        }
    }

    // перезагрузка JS / уничтожение инстанса RN: освобождаем движок, иначе
    // утекает ServiceConnection системного TTS-сервиса
    override fun invalidate() {
        synchronized(lock) {
            rejectPending(NO_ENGINE, "Module invalidated")
            releaseEngine()
        }
        super.invalidate()
    }

    private fun onEngineInit(status: Int) {
        synchronized(lock) {
            if (constructing) {
                deferredInitStatus = status
                return
            }

            handleInitStatus(status)
        }
    }

    // вызывается только под lock
    private fun handleInitStatus(status: Int) {
        // движок уже освобождён (invalidate) — поздний onInit игнорируем
        if (engine == null && status == TextToSpeech.SUCCESS) {
            rejectPending(NO_ENGINE, "Text-to-speech engine was released")
            return
        }

        if (status == TextToSpeech.SUCCESS) {
            ready = true
            val waiting = pendingInit.toList()
            pendingInit.clear()
            waiting.forEach { it.resolve(null) }
            return
        }

        // следующий init() попробует заново (например, пользователь
        // установил/включил движок, не перезапуская приложение)
        releaseEngine()
        rejectPending(NO_ENGINE, "No text-to-speech engine available")
    }

    // вызывается только под lock
    private fun rejectPending(code: String, message: String) {
        val waiting = pendingInit.toList()
        pendingInit.clear()
        waiting.forEach { it.reject(code, message) }
    }

    // вызывается только под lock
    private fun releaseEngine() {
        val tts = engine
        engine = null
        ready = false
        currentLocale = null

        try {
            tts?.stop()
            tts?.shutdown()
        } catch (e: Exception) {
            // движок уже мёртв — освобождать нечего
        }
    }

    private fun isLanguageResultOk(result: Int): Boolean =
        result >= TextToSpeech.LANG_AVAILABLE

    companion object {
        const val NAME = NativeTextToSpeechSpec.NAME

        private const val NO_ENGINE = "no_engine"
        private const val LANG_UNAVAILABLE = "lang_unavailable"
        private const val FAILED = "failed"
    }
}
