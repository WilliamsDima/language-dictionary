import { describe, expect, it } from '@jest/globals'
import { shuffleArray } from './shuffleArray'

describe('shuffleArray', () => {
  it('должен возвращать массив той же длины с теми же элементами', () => {
    const source = [1, 2, 3, 4, 5, 6, 7, 8]
    const shuffled = shuffleArray(source)

    expect(shuffled).toHaveLength(source.length)
    expect([...shuffled].sort()).toEqual([...source].sort())
  })

  it('не должен мутировать исходный массив', () => {
    const source = [1, 2, 3, 4, 5]
    const copy = [...source]
    shuffleArray(source)

    expect(source).toEqual(copy)
  })

  it('не должен ломаться на пустом массиве', () => {
    expect(shuffleArray([])).toEqual([])
  })

  it('не должен ломаться на массиве из одного элемента', () => {
    expect(shuffleArray([42])).toEqual([42])
  })
})
