// GET {APP_LATEST_RELEASE_URL} — манифест последнего опубликованного APK,
// который сервер собирает из release.json воркфлоу release-apk.yml. Полный
// формат: schemaVersion, versionName, versionCode, fileName, url, latestUrl,
// size, sha256, publishedAt, commit, changelog — здесь описаны только поля,
// которые реально читает клиент
export type LatestReleaseDTO = {
  versionName: string
  // android versionCode опубликованного APK — сравнивается с установленным
  versionCode: number
  // «Что нового» по языкам интерфейса. На сервере это поле changelog: CI
  // кладёт туда JSON из release-notes/<versionName>.json. В старых
  // latest.json (changelog — заголовок коммита или пусто) поля нет
  notes?: ReleaseNotes
}

// код языка интерфейса (ru, en, ...) → непустой список пунктов
export type ReleaseNotes = Partial<Record<string, string[]>>
