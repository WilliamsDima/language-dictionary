import type { LatestReleaseDTO, ReleaseNotes } from './types'
import { compareSemver, parseSemver } from '@/shared/helpers/semver'

type RawRelease = {
  versionName?: unknown
  versionCode?: unknown
  changelog?: unknown
}

// язык, на который откатываемся, если заметок на языке интерфейса нет
const NOTES_FALLBACK_LANGUAGES = ['en', 'ru']

const toNotesItems = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === 'string')
        .map((item) => item.trim())
        .filter(Boolean)
    : []

// changelog из latest.json: CI кладёт туда JSON заметок к релизу
// ({"ru": ["..."], "en": ["..."]}, см. README.md → «Релиз APK»). Всё прочее
// (заголовок коммита у старых релизов, пустая строка, битый JSON) —
// заметок нет. Языки без пунктов отбрасываются
export const parseReleaseNotes = (
  changelog: unknown
): ReleaseNotes | undefined => {
  if (typeof changelog !== 'string' || !changelog.trim().startsWith('{')) {
    return undefined
  }

  try {
    const parsed: unknown = JSON.parse(changelog)

    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
      return undefined
    }

    const notes = Object.entries(parsed).reduce<ReleaseNotes>(
      (acc, [language, items]) => {
        const list = toNotesItems(items)

        return list.length ? { ...acc, [language]: list } : acc
      },
      {}
    )

    return Object.keys(notes).length ? notes : undefined
  } catch {
    return undefined
  }
}

// пункты «Что нового» на языке интерфейса; нет его — en, затем ru.
// Пустой массив — блок не показываем
export const getReleaseNotesItems = (
  notes: ReleaseNotes | undefined,
  language: string
): string[] => {
  if (!notes) return []

  const found = [language, ...NOTES_FALLBACK_LANGUAGES]
    .map((code) => notes[code])
    .find((items) => !!items?.length)

  return found ?? []
}

// ответ приходит с внешнего статического хостинга, поэтому форму не
// доверяем: всё, что не похоже на манифест, считаем отсутствием релиза
export const parseLatestRelease = (raw: unknown): LatestReleaseDTO | null => {
  if (typeof raw !== 'object' || raw === null) return null

  const { versionName, versionCode, changelog } = raw as RawRelease

  if (
    typeof versionName !== 'string' ||
    !versionName.trim() ||
    typeof versionCode !== 'number' ||
    !Number.isSafeInteger(versionCode) ||
    versionCode <= 0
  ) {
    return null
  }

  const notes = parseReleaseNotes(changelog)

  return notes
    ? { versionName: versionName.trim(), versionCode, notes }
    : { versionName: versionName.trim(), versionCode }
}

// installedBuildNumber — DeviceInfo.getBuildNumber(): на Android это
// versionCode установленной сборки строкой. Непонятный номер — не
// предлагаем обновление, чем предлагать его зря
export const isNewerRelease = (
  release: LatestReleaseDTO | null | undefined,
  installedBuildNumber: string
): boolean => {
  if (!release) return false

  const installed = Number(installedBuildNumber)

  return (
    Number.isSafeInteger(installed) &&
    installed > 0 &&
    release.versionCode > installed
  )
}

export type UpdateKind = 'none' | 'optional' | 'required'

// вид обновления по semver versionName: установленная версия не старше
// опубликованной — 'none'; вырос MAJOR — 'required' (модалку нельзя
// закрыть); выросли только MINOR/PATCH — 'optional'. Непонятная версия с
// любой стороны — 'none': лучше промолчать, чем заблокировать приложение
export const getUpdateKind = (
  installedVersion: string,
  latestVersion: string
): UpdateKind => {
  const installed = parseSemver(installedVersion)
  const latest = parseSemver(latestVersion)

  if (!installed || !latest || compareSemver(latest, installed) <= 0) {
    return 'none'
  }

  return latest.major > installed.major ? 'required' : 'optional'
}

// индикатор «доступна новая версия» в настройках. Решает semver
// versionName; при равных versionName — versionCode (CI публикует
// пересборку с тем же versionName и большим versionCode). Если versionName
// не разобрать — только versionCode, как раньше
export const hasAvailableUpdate = (
  release: LatestReleaseDTO | null | undefined,
  installedVersion: string,
  installedBuildNumber: string
): boolean => {
  if (!release) return false

  const installed = parseSemver(installedVersion)
  const latest = parseSemver(release.versionName)
  const diff = installed && latest ? compareSemver(latest, installed) : 0

  return diff !== 0 ? diff > 0 : isNewerRelease(release, installedBuildNumber)
}

// версия, которую пользователь отложил кнопкой «Позже», — не показываем
// необязательную модалку снова, пока не выйдет версия новее неё
export const isReleaseSkipped = (
  latestVersion: string,
  skippedVersion: string | undefined
): boolean => {
  const latest = parseSemver(latestVersion)
  const skipped = parseSemver(skippedVersion ?? '')

  return !!latest && !!skipped && compareSemver(latest, skipped) <= 0
}
