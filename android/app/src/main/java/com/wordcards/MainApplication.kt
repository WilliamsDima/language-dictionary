package com.williamsdev.wordcards

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.williamsdev.wordcards.tts.TextToSpeechPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // локальный TurboModule озвучки (см. tts/TextToSpeechModule)
                    add(TextToSpeechPackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        loadReactNative(this)
        createNotificationChannels()
    }

    // канал ежедневных напоминаний: бэкенд шлёт FCM-пуш с android.channel_id
    // "daily_reminder" (он же канал по умолчанию в firebase.json). Создаём его
    // сами при старте, иначе FCM положит пуш в безымянный fallback-канал.
    // Название локализовано через values / values-ru и следует языку системы;
    // повторное создание существующего канала только обновляет имя/описание
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return

        val channel = NotificationChannel(
            DAILY_REMINDER_CHANNEL_ID,
            getString(R.string.daily_reminder_channel_name),
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = getString(R.string.daily_reminder_channel_description)
        }

        getSystemService(NotificationManager::class.java)?.createNotificationChannel(channel)
    }

    private companion object {
        const val DAILY_REMINDER_CHANNEL_ID = "daily_reminder"
    }
}
