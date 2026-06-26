import { IItem } from '@/entities/Item/model/item'
import { ILanguage, languages } from '@/shared/json/languages'
import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { cardsService } from './CardsService'
import type {
  AddItemParams,
  CardDTO,
  CardStatus,
  DeleteItemParams,
  GetItemsParams,
  GetItemsRequest,
  UpdateItemParams,
  UpdateItemStatusParams,
} from './types'

const findLanguage = (code: string): ILanguage =>
  languages.find((lang) => lang.short_name === code) ?? {
    id: 0,
    full_name: code,
    short_name: code,
    country: { id: 0, title: '', flag: '' },
  }

const cardToItem = (card: CardDTO): IItem => ({
  id: card.id,
  idDoc: String(card.id),
  date: new Date(card.date),
  description: card.description ?? '',
  language: findLanguage(card.language),
  items: card.items.map((it) => ({
    id: it.id,
    word: it.word,
    translate: it.translate,
  })),
  status: card.status,
})

const toCardStatus = (status: IItem['status']): CardStatus =>
  status === 'READY' ? 'READY' : 'STUDY'

const itemToCreatePayload = (item: IItem) => ({
  language: item.language.short_name,
  description: item.description,
  status: toCardStatus(item.status),
  items: item.items.map((it) => ({ word: it.word, translate: it.translate })),
})

const itemToUpdatePayload = (item: Partial<IItem>) => ({
  language: item.language?.short_name ?? '',
  description: item.description ?? '',
  items: (item.items ?? []).map((it) => ({ word: it.word, translate: it.translate })),
})

const toListQuery = (params: GetItemsParams) => {
  const limit = params.limitCount ?? 20
  const page = params.page ?? 1
  const status = params.filter?.status

  return {
    search: params.filter?.search,
    status: status && status !== 'ALL' ? status : undefined,
    languages: params.filter?.filter?.languages,
    limit,
    offset: (page - 1) * limit,
  }
}

export const cardsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение списка — все страницы одного фильтра копятся в одной записи кэша
    getItems: build.query<GetItemsRequest, GetItemsParams>({
      async queryFn(params) {
        const result = await cardsService.list(toListQuery(params))
        if (!result.ok) return toRtkQueryResult<GetItemsRequest>(result)

        const { items, total, offset } = result.data
        const hasMore = offset + items.length < total

        return {
          data: {
            items: items.map(cardToItem),
            total,
            lastVisible: hasMore ? offset + items.length : undefined,
          },
        }
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const { page, lastVisible, ...rest } = queryArgs
        return `${endpointName}/${JSON.stringify(rest)}`
      },
      merge: (currentCache, newData, { arg }) => {
        if ((arg.page ?? 1) <= 1) {
          currentCache.items = newData.items
        } else {
          currentCache.items.push(...newData.items)
        }
        currentCache.total = newData.total
        currentCache.lastVisible = newData.lastVisible
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page
      },
      providesTags: ['cards'],
    }),
    // добавление элемента
    addItem: build.mutation<IItem, AddItemParams>({
      async queryFn({ item }) {
        const result = await cardsService.create(itemToCreatePayload(item))
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(result.data) }
      },
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        const { data: created } = await queryFulfilled.catch(() => ({ data: null }))
        if (!created) return

        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )
        cachedArgs.forEach((args) => {
          dispatch(
            cardsServices.util.updateQueryData('getItems', args, (draft) => {
              draft.items.unshift(created)
              draft.total += 1
            })
          )
        })
      },
    }),
    // обновление элемента
    updateItem: build.mutation<IItem, UpdateItemParams>({
      async queryFn({ idDoc, updatedData }) {
        const result = await cardsService.update(
          Number(idDoc),
          itemToUpdatePayload(updatedData)
        )
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(result.data) }
      },
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        const { data: updated } = await queryFulfilled.catch(() => ({ data: null }))
        if (!updated) return

        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )
        cachedArgs.forEach((args) => {
          dispatch(
            cardsServices.util.updateQueryData('getItems', args, (draft) => {
              const index = draft.items.findIndex((it) => it.id === updated.id)
              if (index !== -1) draft.items[index] = updated
            })
          )
        })
      },
    }),
    // изменение статуса элемента — оптимистичное обновление с rollback
    updateItemStatus: build.mutation<IItem, UpdateItemStatusParams>({
      async queryFn({ idDoc, status }) {
        const result = await cardsService.updateStatus(Number(idDoc), status)
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(result.data) }
      },
      async onQueryStarted({ idDoc, status }, { dispatch, getState, queryFulfilled }) {
        const cardId = Number(idDoc)
        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )
        const patches = cachedArgs.map((args) =>
          dispatch(
            cardsServices.util.updateQueryData('getItems', args, (draft) => {
              const found = draft.items.find((it) => it.id === cardId)
              if (found) found.status = status
            })
          )
        )

        try {
          await queryFulfilled
        } catch {
          patches.forEach((patch) => patch.undo())
        }
      },
    }),
    // удаление элемента — оптимистичное обновление с rollback
    deleteItem: build.mutation<{ success: boolean; id: string }, DeleteItemParams>({
      async queryFn({ idDoc }) {
        const result = await cardsService.remove(Number(idDoc))
        if (!result.ok) return toRtkQueryResult<{ success: boolean; id: string }>(result)
        return { data: { success: true, id: idDoc } }
      },
      async onQueryStarted({ idDoc }, { dispatch, getState, queryFulfilled }) {
        const cardId = Number(idDoc)
        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )
        const patches = cachedArgs.map((args) =>
          dispatch(
            cardsServices.util.updateQueryData('getItems', args, (draft) => {
              draft.items = draft.items.filter((it) => it.id !== cardId)
              draft.total -= 1
            })
          )
        )

        try {
          await queryFulfilled
        } catch {
          patches.forEach((patch) => patch.undo())
        }
      },
    }),
  }),
})

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useUpdateItemStatusMutation,
  useDeleteItemMutation,
  useLazyGetItemsQuery,
} = cardsServices
