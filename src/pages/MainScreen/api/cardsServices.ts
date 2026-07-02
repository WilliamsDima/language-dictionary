import { IItem } from '@/entities/Item/model/item'
import { ILanguage } from '@/shared/API/services/languages/types'
import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { cardsService } from './CardsService'
import { languagesAPI } from '@/shared/API/services/languages/LanguagesQuery'
import type { FilterMain } from '@/shared/store/slice/itemsSlice'
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

const findLanguage = (langList: ILanguage[], code: string): ILanguage =>
  langList.find((lang) => lang.code === code) ?? {
    id: 0,
    name: code,
    code,
    emoji: '',
  }

const cardToItem = (langList: ILanguage[], card: CardDTO): IItem => ({
  id: card.id,
  idDoc: String(card.id),
  date: new Date(card.date),
  description: card.description ?? '',
  language: findLanguage(langList, card.language),
  items: (card.items ?? []).map((it) => ({
    id: it.id,
    word: it.word,
    translate: it.translate,
  })),
  status: card.status,
})

const toCardStatus = (status: IItem['status']): CardStatus =>
  status === 'READY' ? 'READY' : 'STUDY'

const itemToCreatePayload = (item: IItem) => ({
  language: item.language.code,
  description: item.description,
  status: toCardStatus(item.status),
  items: item.items.map((it) => ({ word: it.word, translate: it.translate })),
})

const itemToUpdatePayload = (item: Partial<IItem>) => ({
  language: item.language?.code ?? '',
  description: item.description ?? '',
  items: (item.items ?? []).map((it) => ({ word: it.word, translate: it.translate })),
})

const getLangList = async (
  dispatch: (action: any) => any,
  getState: () => unknown
): Promise<ILanguage[]> => {
  const cached = languagesAPI.endpoints.getLanguages.select(undefined)(
    getState() as any
  )
  if (cached.data) return cached.data

  const result = await dispatch(
    languagesAPI.endpoints.getLanguages.initiate(undefined)
  )
  return 'data' in result ? (result.data ?? []) : []
}

const toSortParam = (sortDate: FilterMain['sortDate']): 'date_asc' | 'date_desc' =>
  sortDate === 'asc' ? 'date_asc' : 'date_desc'

const toListQuery = (params: GetItemsParams) => {
  const limit = params.limitCount ?? 20
  const page = params.page ?? 1
  const status = params.filter?.status

  return {
    search: params.filter?.search,
    status: status && status !== 'ALL' ? status : undefined,
    languages: params.filter?.filter?.languages,
    sort: toSortParam(params.filter?.filter?.sortDate),
    limit,
    offset: (page - 1) * limit,
  }
}

export const cardsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение списка — все страницы одного фильтра копятся в одной записи кэша
    getItems: build.query<GetItemsRequest, GetItemsParams>({
      async queryFn(params, { dispatch, getState }) {
        const langList = await getLangList(dispatch, getState)
        const result = await cardsService.list(toListQuery(params))
        if (!result.ok) return toRtkQueryResult<GetItemsRequest>(result)

        const { items, total, offset } = result.data
        const hasMore = offset + items.length < total

        return {
          data: {
            items: items.map((card) => cardToItem(langList, card)),
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
      async queryFn({ item }, { dispatch, getState }) {
        const langList = await getLangList(dispatch, getState)
        const result = await cardsService.create(itemToCreatePayload(item))
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(langList, result.data) }
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
      async queryFn({ idDoc, updatedData }, { dispatch, getState }) {
        const langList = await getLangList(dispatch, getState)
        const result = await cardsService.update(
          Number(idDoc),
          itemToUpdatePayload(updatedData)
        )
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(langList, result.data) }
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
    // изменение статуса элемента — оптимистичное обновление с rollback:
    // карточка сразу пропадает из кэша списков с другим статусом-фильтром
    // и появляется в кэше списков, под фильтр которых теперь подходит
    updateItemStatus: build.mutation<IItem, UpdateItemStatusParams>({
      async queryFn({ idDoc, status }, { dispatch, getState }) {
        const langList = await getLangList(dispatch, getState)
        const result = await cardsService.updateStatus(Number(idDoc), status)
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(langList, result.data) }
      },
      async onQueryStarted({ idDoc, status }, { dispatch, getState, queryFulfilled }) {
        const cardId = Number(idDoc)
        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )

        // берём актуальные данные карточки из любого кэша, где она уже есть —
        // это нужно, чтобы вставить полноценный элемент в списки, под фильтр
        // которых она подпадает только после смены статуса
        const knownItem = cachedArgs.reduce<IItem | undefined>((acc, args) => {
          if (acc) return acc
          const selected = cardsServices.endpoints.getItems.select(args)(
            getState()
          )
          return selected.data?.items.find((it) => it.id === cardId)
        }, undefined)

        const patches = knownItem
          ? cachedArgs.map((args) => {
              const optimisticItem = { ...knownItem, status }
              const filterStatus = args.filter?.status
              const matchesFilter =
                !filterStatus || filterStatus === 'ALL' || filterStatus === status

              return dispatch(
                cardsServices.util.updateQueryData('getItems', args, (draft) => {
                  const index = draft.items.findIndex((it) => it.id === cardId)

                  if (matchesFilter) {
                    if (index !== -1) {
                      draft.items[index].status = status
                    } else {
                      draft.items.unshift(optimisticItem)
                      draft.total += 1
                    }
                  } else if (index !== -1) {
                    draft.items.splice(index, 1)
                    draft.total -= 1
                  }
                })
              )
            })
          : []

        try {
          const { data: updated } = await queryFulfilled

          // подстраховка на случай, если карточки не было ни в одном кэше
          // на момент старта мутации (например, вкладка ещё не была открыта) —
          // используем реальные данные с сервера, чтобы список всё равно обновился
          if (!knownItem) {
            cachedArgs.forEach((args) => {
              const filterStatus = args.filter?.status
              const matchesFilter =
                !filterStatus || filterStatus === 'ALL' || filterStatus === status

              dispatch(
                cardsServices.util.updateQueryData('getItems', args, (draft) => {
                  const index = draft.items.findIndex((it) => it.id === cardId)

                  if (matchesFilter && index === -1) {
                    draft.items.unshift(updated)
                    draft.total += 1
                  } else if (!matchesFilter && index !== -1) {
                    draft.items.splice(index, 1)
                    draft.total -= 1
                  }
                })
              )
            })
          }
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
