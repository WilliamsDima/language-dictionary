export type SemVer = {
  major: number
  minor: number
  patch: number
}

const NUMERIC_PART = /^\d+$/

// разбирает версию вида "2.1.0" (versionName сборки / latest.json).
// Допускаем префикс "v", недостающие сегменты ("2", "2.1") считаем нулями,
// суффиксы pre-release/build ("2.1.0-beta.1", "2.1.0+5") отбрасываем.
// Всё остальное — непонятная версия: null, чтобы вызывающий код ничего не
// предлагал вместо ложной тревоги
export const parseSemver = (version: string): SemVer | null => {
  const core = version.trim().replace(/^v/i, '').split(/[-+]/)[0]
  const parts = core.split('.')

  if (parts.length > 3 || !parts.every((part) => NUMERIC_PART.test(part))) {
    return null
  }

  const [major, minor = 0, patch = 0] = parts.map(Number)

  return { major, minor, patch }
}

// < 0 — a старше b, 0 — равны, > 0 — a новее b
export const compareSemver = (a: SemVer, b: SemVer): number =>
  a.major - b.major || a.minor - b.minor || a.patch - b.patch
