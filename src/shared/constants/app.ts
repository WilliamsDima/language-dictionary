// приложение распространяется APK-файлом с нашего сервера (не через сторы):
// страница скачивания — сюда ведёт кнопка «Обновить»
export const APP_DOWNLOAD_PAGE_URL = 'https://wordcards-admin.duckdns.org/download'

// манифест последнего опубликованного APK (публичный, без авторизации) —
// публикуется CI-воркфлоу release-apk.yml, см. README
export const APP_LATEST_RELEASE_URL =
  'https://wordcards-admin.duckdns.org/apk/latest.json'
