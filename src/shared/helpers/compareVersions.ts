const toParts = (version: string): number[] =>
  version
    .trim()
    .replace(/^v/i, '')
    .split(/[.-]/)
    .map((part) => parseInt(part, 10))
    .map((part) => (Number.isFinite(part) ? part : 0))

// сравнение версий вида "1.1.5" / "2.0.0": < 0 — a старше b, 0 — равны,
// > 0 — a новее b. Недостающие сегменты считаются нулями ("2" === "2.0.0")
export const compareVersions = (a: string, b: string): number => {
  const partsA = toParts(a)
  const partsB = toParts(b)
  const length = Math.max(partsA.length, partsB.length)

  return Array.from({ length }).reduce<number>((acc, _, i) => {
    if (acc !== 0) return acc

    return (partsA[i] ?? 0) - (partsB[i] ?? 0)
  }, 0)
}
