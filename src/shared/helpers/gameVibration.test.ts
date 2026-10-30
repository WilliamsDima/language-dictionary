import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Vibration } from 'react-native'
import { LOCAL_KEYS } from '../constants/localStorage'
import { appStorage } from '../storage/mmkv.storage'
import {
  isGameVibrationEnabled,
  setGameVibrationEnabled,
  vibrateOnWrongAnswer,
} from './gameVibration'

jest.mock('../storage/mmkv.storage', () => ({
  appStorage: {
    getBoolean: jest.fn(),
    setBoolean: jest.fn(),
  },
}))

const getBooleanMock = jest.mocked(appStorage.getBoolean)

describe('gameVibration', () => {
  const vibrateSpy = jest.spyOn(Vibration, 'vibrate')

  beforeEach(() => {
    jest.clearAllMocks()
    vibrateSpy.mockImplementation(() => undefined)
  })

  it('включена по умолчанию, пока настройку не меняли', () => {
    getBooleanMock.mockReturnValue(undefined)

    expect(isGameVibrationEnabled()).toBe(true)

    vibrateOnWrongAnswer()

    expect(vibrateSpy).toHaveBeenCalledTimes(1)
  })

  it('вибрирует, если настройка включена', () => {
    getBooleanMock.mockReturnValue(true)

    vibrateOnWrongAnswer()

    expect(vibrateSpy).toHaveBeenCalledTimes(1)
  })

  it('не вибрирует, если настройка выключена', () => {
    getBooleanMock.mockReturnValue(false)

    expect(isGameVibrationEnabled()).toBe(false)

    vibrateOnWrongAnswer()

    expect(vibrateSpy).not.toHaveBeenCalled()
  })

  it('сохраняет настройку в хранилище', () => {
    setGameVibrationEnabled(false)

    expect(appStorage.setBoolean).toHaveBeenCalledWith(
      LOCAL_KEYS.gameVibrationEnabled,
      false
    )
  })
})
