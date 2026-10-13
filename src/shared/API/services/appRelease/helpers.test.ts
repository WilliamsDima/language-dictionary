import {
  getReleaseNotesItems,
  getUpdateKind,
  hasAvailableUpdate,
  isNewerRelease,
  isReleaseSkipped,
  parseLatestRelease,
  parseReleaseNotes,
} from './helpers'

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

describe('parseLatestRelease: заметки к релизу', () => {
  const base = { versionName: '2.1.0', versionCode: 42 }

  it('должен разбирать заметки из changelog', () => {
    expect(
      parseLatestRelease({
        ...base,
        changelog: '{"ru":["  Пункт  ",""],"en":["Item"],"uk":[]}',
      })
    ).toEqual({ ...base, notes: { ru: ['Пункт'], en: ['Item'] } })
  })

  it('не должен добавлять заметки для старого changelog', () => {
    expect(
      parseLatestRelease({ ...base, changelog: 'feat: something' })
    ).toEqual(base)
    expect(parseLatestRelease({ ...base, changelog: '' })).toEqual(base)
    expect(parseLatestRelease({ ...base, changelog: '{oops' })).toEqual(base)
    expect(parseLatestRelease({ ...base, changelog: '{"ru":[]}' })).toEqual(
      base
    )
    expect('notes' in (parseLatestRelease(base) ?? {})).toBe(false)
  })
})

describe('parseReleaseNotes', () => {
  it('должен игнорировать не-строки и не-массивы', () => {
    expect(parseReleaseNotes(undefined)).toBeUndefined()
    expect(parseReleaseNotes('[1,2]')).toBeUndefined()
    expect(parseReleaseNotes('{"ru":"text","en":[1,"Item"]}')).toEqual({
      en: ['Item'],
    })
  })
})

describe('getReleaseNotesItems', () => {
  const notes = { ru: ['Пункт'], en: ['Item'], uk: ['Пункт uk'] }

  it('должен отдавать заметки на языке интерфейса', () => {
    expect(getReleaseNotesItems(notes, 'uk')).toEqual(['Пункт uk'])
    expect(getReleaseNotesItems(notes, 'ru')).toEqual(['Пункт'])
  })

  it('должен откатываться на en, затем на ru', () => {
    expect(getReleaseNotesItems(notes, 'ka')).toEqual(['Item'])
    expect(getReleaseNotesItems({ ru: ['Пункт'] }, 'ka')).toEqual(['Пункт'])
  })

  it('должен отдавать пустой список без заметок', () => {
    expect(getReleaseNotesItems(undefined, 'ru')).toEqual([])
    expect(getReleaseNotesItems({ uz: ['x'] }, 'ka')).toEqual([])
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

describe('getUpdateKind', () => {
  it('не должен предлагать обновление, если установлена та же или более новая версия', () => {
    expect(getUpdateKind('2.0.0', '2.0.0')).toBe('none')
    expect(getUpdateKind('2.1.0', '2.0.5')).toBe('none')
    expect(getUpdateKind('3.0.0', '2.9.9')).toBe('none')
  })

  it('должен требовать обновление при росте MAJOR', () => {
    expect(getUpdateKind('1.9.9', '2.0.0')).toBe('required')
    expect(getUpdateKind('1.0.0', '3.1.2')).toBe('required')
  })

  it('должен предлагать необязательное обновление при росте MINOR/PATCH', () => {
    expect(getUpdateKind('2.0.0', '2.1.0')).toBe('optional')
    expect(getUpdateKind('2.0.0', '2.0.1')).toBe('optional')
    expect(getUpdateKind('2.9.0', '2.10.0')).toBe('optional')
  })

  it('должен молчать при непонятной версии', () => {
    expect(getUpdateKind('2.0.0', '')).toBe('none')
    expect(getUpdateKind('2.0.0', 'latest')).toBe('none')
    expect(getUpdateKind('unknown', '3.0.0')).toBe('none')
  })
})

describe('hasAvailableUpdate', () => {
  const release = { versionName: '2.1.0', versionCode: 42 }

  it('должен находить обновление по более новому versionName', () => {
    expect(hasAvailableUpdate(release, '2.0.0', '50')).toBe(true)
  })

  it('не должен показывать обновление, если установлена более новая версия', () => {
    expect(hasAvailableUpdate(release, '2.2.0', '10')).toBe(false)
  })

  it('при равном versionName должен сравнивать versionCode', () => {
    expect(hasAvailableUpdate(release, '2.1.0', '41')).toBe(true)
    expect(hasAvailableUpdate(release, '2.1.0', '42')).toBe(false)
  })

  it('при непонятном versionName должен сравнивать только versionCode', () => {
    expect(hasAvailableUpdate(release, 'dev', '41')).toBe(true)
    expect(hasAvailableUpdate(release, 'dev', '42')).toBe(false)
  })

  it('не должен показывать обновление без релиза', () => {
    expect(hasAvailableUpdate(null, '1.0.0', '1')).toBe(false)
    expect(hasAvailableUpdate(undefined, '1.0.0', '1')).toBe(false)
  })
})

describe('isReleaseSkipped', () => {
  it('должен считать пропущенной отложенную версию и более старые', () => {
    expect(isReleaseSkipped('2.1.0', '2.1.0')).toBe(true)
    expect(isReleaseSkipped('2.0.5', '2.1.0')).toBe(true)
  })

  it('должен снова показывать модалку, когда вышла версия новее отложенной', () => {
    expect(isReleaseSkipped('2.1.1', '2.1.0')).toBe(false)
  })

  it('не должен считать версию пропущенной без сохранённого значения', () => {
    expect(isReleaseSkipped('2.1.0', undefined)).toBe(false)
    expect(isReleaseSkipped('2.1.0', 'garbage')).toBe(false)
  })
})
