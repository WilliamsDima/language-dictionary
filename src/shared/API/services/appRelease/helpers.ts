import type { LatestReleaseDTO } from './types'

type RawRelease = {
  versionName?: unknown
  versionCode?: unknown
}

// ответ приходит с внешнего статического хостинга, поэтому форму не
// доверяем: всё, что не похоже на манифест, считаем отсутствием релиза
export const parseLatestRelease = (raw: unknown): LatestReleaseDTO | null => {
  if (typeof raw !== 'object' || raw === null) return null

  const { versionName, versionCode } = raw as RawRelease

  if (
    typeof versionName !== 'string' ||
    !versionName.trim() ||
    typeof versionCode !== 'number' ||
    !Number.isSafeInteger(versionCode) ||
    versionCode <= 0
  ) {
    return null
  }

  return { versionName: versionName.trim(), versionCode }
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
