import { isNewerRelease, parseLatestRelease } from './helpers'

describe('parseLatestRelease', () => {
  it('должен разбирать манифест latest.json', () => {
    expect(
      parseLatestRelease({
        schemaVersion: 1,
        versionName: '1.4.0',
        versionCode: 42,
        url: 'https://example.com/app.apk',
      })
    ).toEqual({ versionName: '1.4.0', versionCode: 42 })
  })

  it('должен возвращать null для неполного или битого ответа', () => {
    expect(parseLatestRelease(null)).toBeNull()
    expect(parseLatestRelease('oops')).toBeNull()
    expect(parseLatestRelease({ versionName: '1.4.0' })).toBeNull()
    expect(parseLatestRelease({ versionName: '', versionCode: 42 })).toBeNull()
    expect(
      parseLatestRelease({ versionName: '1.4.0', versionCode: '42' })
    ).toBeNull()
    expect(parseLatestRelease({ versionName: '1.4.0', versionCode: 0 })).toBeNull()
    expect(parseLatestRelease({ versionName: '1.4.0', versionCode: 1.5 })).toBeNull()
  })
})

describe('isNewerRelease', () => {
  const release = { versionName: '1.4.0', versionCode: 42 }

  it('должен находить обновление по versionCode', () => {
    expect(isNewerRelease(release, '41')).toBe(true)
  })

  it('не должен предлагать ту же или более старую сборку', () => {
    expect(isNewerRelease(release, '42')).toBe(false)
    expect(isNewerRelease(release, '100')).toBe(false)
  })

  it('не должен предлагать обновление без релиза или с непонятным номером', () => {
    expect(isNewerRelease(null, '1')).toBe(false)
    expect(isNewerRelease(undefined, '1')).toBe(false)
    expect(isNewerRelease(release, 'unknown')).toBe(false)
    expect(isNewerRelease(release, '')).toBe(false)
  })
})
