import { compareSemver, parseSemver } from './semver'

describe('parseSemver', () => {
  it('должен разбирать MAJOR.MINOR.PATCH', () => {
    expect(parseSemver('2.1.3')).toEqual({ major: 2, minor: 1, patch: 3 })
    expect(parseSemver(' v10.0.12 ')).toEqual({ major: 10, minor: 0, patch: 12 })
  })

  it('должен дополнять недостающие сегменты нулями', () => {
    expect(parseSemver('2')).toEqual({ major: 2, minor: 0, patch: 0 })
    expect(parseSemver('2.1')).toEqual({ major: 2, minor: 1, patch: 0 })
  })

  it('должен отбрасывать pre-release и build суффиксы', () => {
    expect(parseSemver('2.1.0-beta.1')).toEqual({ major: 2, minor: 1, patch: 0 })
    expect(parseSemver('2.1.0+42')).toEqual({ major: 2, minor: 1, patch: 0 })
  })

  it('должен возвращать null для непонятной версии', () => {
    expect(parseSemver('')).toBeNull()
    expect(parseSemver('unknown')).toBeNull()
    expect(parseSemver('2.x.0')).toBeNull()
    expect(parseSemver('2..0')).toBeNull()
    expect(parseSemver('1.2.3.4')).toBeNull()
  })
})

describe('compareSemver', () => {
  const v = (version: string) => {
    const parsed = parseSemver(version)

    if (!parsed) throw new Error(`invalid version ${version}`)

    return parsed
  }

  it('должен сравнивать по major, затем minor, затем patch', () => {
    expect(compareSemver(v('1.9.9'), v('2.0.0'))).toBeLessThan(0)
    expect(compareSemver(v('2.1.0'), v('2.0.9'))).toBeGreaterThan(0)
    expect(compareSemver(v('2.0.10'), v('2.0.9'))).toBeGreaterThan(0)
    expect(compareSemver(v('1.9.10'), v('1.10.0'))).toBeLessThan(0)
  })

  it('должен считать равными одинаковые версии', () => {
    expect(compareSemver(v('2.0.0'), v('2'))).toBe(0)
    expect(compareSemver(v('v2.0.0'), v('2.0.0-rc.1'))).toBe(0)
  })
})
