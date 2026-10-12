package com.williamsdev.wordcards.tts

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

// регистрируется вручную в MainApplication (локальный модуль приложения,
// автолинковка его не видит)
class TextToSpeechPackage : BaseReactPackage() {

    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext,
    ): NativeModule? =
        if (name == TextToSpeechModule.NAME) TextToSpeechModule(reactContext) else null

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider =
        ReactModuleInfoProvider {
            mapOf(
                TextToSpeechModule.NAME to ReactModuleInfo(
                    name = TextToSpeechModule.NAME,
                    className = TextToSpeechModule.NAME,
                    canOverrideExistingModule = false,
                    needsEagerInit = false,
                    isCxxModule = false,
                    isTurboModule = true,
                )
            )
        }
}
