import { compareVersions } from './compareVersions'

describe('compareVersions', () => {
  it('detects an older installed version', () => {
    expect(compareVersions('1.1.5', '2.0.0')).toBeLessThan(0)
    expect(compareVersions('1.9.10', '1.10.0')).toBeLessThan(0)
  })

  it('treats equal versions as equal', () => {
    expect(compareVersions('2.0.0', '2.0.0')).toBe(0)
    expect(compareVersions('2', '2.0.0')).toBe(0)
    expect(compareVersions('v2.0.0', ' 2.0.0 ')).toBe(0)
  })

  it('detects a newer installed version', () => {
    expect(compareVersions('2.0.1', '2.0.0')).toBeGreaterThan(0)
  })
})
