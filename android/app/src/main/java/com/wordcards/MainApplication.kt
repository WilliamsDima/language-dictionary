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

    // каналы уведомлений. Создаём их сами при старте (Application.onCreate
    // выполняется и когда процесс поднимает FCM для пуша в фоне), иначе FCM
    // положит пуш в безымянный fallback-канал.
    // - "daily_reminder": бэкенд шлёт ежедневное напоминание с этим
    //   android.channel_id;
    // - "general": канал по умолчанию в firebase.json
    //   (messaging_android_notification_channel_id) — для пушей без channel_id,
    //   например ручных сообщений из админки (data.type = "admin_message").
    //   Отдельный канал, чтобы выключение напоминаний не глушило сообщения;
    // - "app_update": бэкенд шлёт пуш «Доступна новая версия» с этим
    //   android.channel_id (data.type = "app_update").
    // Названия локализованы через values / values-ru и следуют языку системы;
    // повторное создание существующего канала только обновляет имя/описание
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return

        val dailyReminderChannel = NotificationChannel(
            DAILY_REMINDER_CHANNEL_ID,
            getString(R.string.daily_reminder_channel_name),
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = getString(R.string.daily_reminder_channel_description)
        }

        val generalChannel = NotificationChannel(
            GENERAL_CHANNEL_ID,
            getString(R.string.general_channel_name),
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            description = getString(R.string.general_channel_description)
        }

        val appUpdateChannel = NotificationChannel(
            APP_UPDATE_CHANNEL_ID,
            getString(R.string.app_update_channel_name),
            NotificationManager.IMPORTANCE_DEFAULT
        ).apply {
            description = getString(R.string.app_update_channel_description)
        }

        getSystemService(NotificationManager::class.java)?.createNotificationChannels(
            listOf(dailyReminderChannel, generalChannel, appUpdateChannel)
        )
    }

    private companion object {
        const val DAILY_REMINDER_CHANNEL_ID = "daily_reminder"
        const val GENERAL_CHANNEL_ID = "general"
        const val APP_UPDATE_CHANNEL_ID = "app_update"
    }
}
