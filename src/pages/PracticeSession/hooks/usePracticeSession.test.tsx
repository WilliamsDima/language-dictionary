import React, { FC, StrictMode } from 'react'
import renderer, { act, type ReactTestRenderer } from 'react-test-renderer'
import type { IItem } from '@/entities/Item/model/item'
import type { PracticeModeId } from '@/entities/PracticeMode/model/practiceMode'
import type { LogEventPayload } from '@/shared/API/services/metrics/types'
import { usePracticeSession } from './usePracticeSession'

const makeItem = (id: number): IItem => ({
  id,
  date: '2026-10-25',
  description: '',
  language: 'en',
  items: [{ id, word: `word ${id}`, translate: `перевод ${id}` }],
  status: 'STUDY',
})

const mockGoBack = jest.fn()
const mockLogMetricEvent = jest.fn<void, [LogEventPayload]>()
const mockItemsResult: { current: { data?: { items: IItem[] }; isError: boolean } } = {
  current: { data: { items: [makeItem(1), makeItem(2)] }, isError: false },
}

const mockState = {
  app: { isAuth: true },
  items: {
    filterCardsModal: {
      status: 'ALL',
      languages: [],
      limit: 'ALL',
      showVariant: 'word',
    },
  },
}

jest.mock('@/shared/hooks/useNavigation', () => ({
  useAppNavigation: () => ({ goBack: mockGoBack }),
}))

jest.mock('@/shared/hooks/useStore', () => ({
  useAppSelector: (selector: (state: typeof mockState) => unknown) =>
    selector(mockState),
}))

jest.mock('@/pages/MainScreen/api/cardsServices', () => ({
  useGetItemsQuery: () => mockItemsResult.current,
}))

jest.mock('@/shared/API/services/metrics/MetricsQuery', () => ({
  // новая ссылка на каждый рендер: эффект с отправкой будет перезапускаться,
  // и единственной защитой от повторной отправки остаётся учёт по сессии
  useLogMetricEventMutation: () => [
    (payload: LogEventPayload) => mockLogMetricEvent(payload),
  ],
}))

jest.mock('../modes/practiceQuestions', () => {
  const entry = { kind: 'card', Question: () => null }

  return {
    PRACTICE_QUESTIONS: {
      flashcards: entry,
      listening: entry,
      // режим с вопросом, но без значения в контракте бэкенда
      sentence: entry,
    },
  }
})

type Session = ReturnType<typeof usePracticeSession>

const COMPLETED_FLASHCARDS: LogEventPayload = {
  type: 'practice_session_completed',
  meta: { mode: 'flashcards' },
}

const setup = (modeId: PracticeModeId) => {
  const current: { session: Session | null; root: ReactTestRenderer | null } = {
    session: null,
    root: null,
  }

  const Probe: FC = () => {
    current.session = usePracticeSession(modeId)
    return null
  }

  const element = () => (
    <StrictMode>
      <Probe />
    </StrictMode>
  )

  act(() => {
    current.root = renderer.create(element())
  })

  const getSession = (): Session => {
    if (!current.session) throw new Error('hook is not rendered')
    return current.session
  }

  return {
    getSession,
    rerender: () =>
      act(() => {
        current.root?.update(element())
      }),
    answerAll: () => {
      Array.from({ length: getSession().total }).forEach(() => {
        act(() => {
          getSession().answerStep({ [getSession().currentCards[0].id]: true })
        })
      })
    },
    unmount: () => act(() => current.root?.unmount()),
  }
}

const completedCalls = () =>
  mockLogMetricEvent.mock.calls.filter(
    ([payload]) => payload.type === 'practice_session_completed'
  )

describe('usePracticeSession: practice_session_completed', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockItemsResult.current = {
      data: { items: [makeItem(1), makeItem(2)] },
      isError: false,
    }
  })

  it('reports nothing until the summary is reached', () => {
    const { getSession, unmount } = setup('flashcards')

    act(() => {
      getSession().answerStep({ [getSession().currentCards[0].id]: true })
    })

    expect(getSession().isFinished).toBe(false)
    expect(completedCalls()).toHaveLength(0)

    unmount()
  })

  it('reports a completed session exactly once', () => {
    const { answerAll, getSession, unmount } = setup('flashcards')

    answerAll()

    expect(getSession().isFinished).toBe(true)
    expect(completedCalls()).toEqual([[COMPLETED_FLASHCARDS]])

    unmount()
  })

  it('does not report again on re-renders and cache updates', () => {
    const { answerAll, rerender, unmount } = setup('flashcards')

    answerAll()

    mockItemsResult.current = {
      data: { items: [makeItem(1), makeItem(2), makeItem(3)] },
      isError: false,
    }
    rerender()
    rerender()

    expect(completedCalls()).toHaveLength(1)

    unmount()
  })

  it('does not report twice on a double press of the last answer', () => {
    const { getSession, unmount } = setup('flashcards')

    act(() => {
      getSession().answerStep({ [getSession().currentCards[0].id]: true })
    })
    act(() => {
      const session = getSession()
      session.answerStep({ [session.currentCards[0].id]: true })
      session.answerStep({ [session.currentCards[0].id]: true })
    })

    expect(completedCalls()).toHaveLength(1)

    unmount()
  })

  it('counts a session after «Ещё раз» as a new one', () => {
    const { answerAll, getSession, unmount } = setup('flashcards')

    answerAll()
    act(() => {
      getSession().restart()
    })

    expect(getSession().isFinished).toBe(false)
    expect(completedCalls()).toHaveLength(1)

    answerAll()

    expect(completedCalls()).toEqual([
      [COMPLETED_FLASHCARDS],
      [COMPLETED_FLASHCARDS],
    ])

    unmount()
  })

  it('does not count a restart that was not completed', () => {
    const { answerAll, getSession, unmount } = setup('flashcards')

    answerAll()
    act(() => {
      getSession().restart()
    })
    act(() => {
      getSession().finish()
    })

    expect(completedCalls()).toHaveLength(1)

    unmount()
  })

  it('leaving mid-session sends only training_opened', () => {
    const { getSession, unmount } = setup('flashcards')

    act(() => {
      getSession().answerStep({ [getSession().currentCards[0].id]: true })
    })
    act(() => {
      getSession().finish()
    })

    expect(mockLogMetricEvent.mock.calls).toEqual([
      [{ type: 'training_opened' }],
    ])
    expect(mockGoBack).toHaveBeenCalledTimes(1)

    unmount()
  })

  it('still sends training_opened when leaving the summary', () => {
    const { answerAll, getSession, unmount } = setup('flashcards')

    answerAll()
    act(() => {
      getSession().finish()
    })

    expect(mockLogMetricEvent.mock.calls).toEqual([
      [COMPLETED_FLASHCARDS],
      [{ type: 'training_opened' }],
    ])

    unmount()
  })

  it('does not report a mode the backend does not accept', () => {
    const { answerAll, getSession, unmount } = setup('sentence')

    answerAll()

    expect(getSession().isFinished).toBe(true)
    expect(mockLogMetricEvent).not.toHaveBeenCalled()

    unmount()
  })

  it('does not report an empty session', () => {
    mockItemsResult.current = { data: { items: [] }, isError: false }

    const { getSession, unmount } = setup('flashcards')

    expect(getSession().total).toBe(0)
    expect(getSession().isFinished).toBe(false)
    expect(mockLogMetricEvent).not.toHaveBeenCalled()

    unmount()
  })
})
