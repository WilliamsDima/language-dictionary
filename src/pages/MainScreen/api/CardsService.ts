import { request } from '@/shared/API/request'
import type { CardDTO, CardStatus, GetCardsResponseDTO } from './types'

type ListQuery = {
  search?: string
  status?: CardStatus
  languages?: string[]
  sort?: 'date_asc' | 'date_desc'
  limit?: number
  offset?: number
}

type CardItemPayload = {
  word: string
  translate: string
}

type CreateCardPayload = {
  language: string
  description?: string
  status?: CardStatus
  items: CardItemPayload[]
}

type UpdateCardPayload = {
  language: string
  description?: string
  items: CardItemPayload[]
}

const buildQuery = (params: ListQuery): string => {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)
  if (params.languages?.length) query.set('languages', params.languages.join(','))
  if (params.sort) query.set('sort', params.sort)
  if (typeof params.limit === 'number') query.set('limit', String(params.limit))
  if (typeof params.offset === 'number') query.set('offset', String(params.offset))

  const qs = query.toString()
  return qs ? `?${qs}` : ''
}

class CardsService {
  list(params: ListQuery) {
    return request<GetCardsResponseDTO>(`/cards${buildQuery(params)}`, {
      method: 'GET',
    })
  }

  create(payload: CreateCardPayload) {
    return request<CardDTO>('/cards', { method: 'POST', json: payload })
  }

  update(cardId: number, payload: UpdateCardPayload) {
    return request<CardDTO>(`/cards/${cardId}`, { method: 'PUT', json: payload })
  }

  remove(cardId: number) {
    return request<{ deleted: number }>(`/cards/${cardId}`, { method: 'DELETE' })
  }

  updateStatus(cardId: number, status: CardStatus) {
    return request<CardDTO>(`/cards/${cardId}/status`, {
      method: 'PUT',
      json: { status },
    })
  }
}

export const cardsService = new CardsService()
