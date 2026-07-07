import { IItem } from '@/entities/Item/model/item'
import { baseApi } from '@/shared/API/baseApi'
import { toRtkQueryResult } from '@/shared/API/RTK/rtk'
import { cardsService } from './CardsService'
import type { FilterMain } from '@/shared/store/slice/itemsSlice'
import type {
  AddItemParams,
  CardDTO,
  DeleteItemParams,
  GetItemsParams,
  GetItemsRequest,
  UpdateItemParams,
  UpdateItemStatusParams,
} from './types'

// items[].date из CardItemDTO сознательно не сохраняется в IItem —
// нигде в UI дата отдельного слова карточки не отображается,
// значима только дата самой карточки (card.date)
export const cardToItem = (card: CardDTO): IItem => ({
  id: card.id,
  date: card.date,
  description: card.description ?? '',
  language: card.language,
  items: (card.items ?? []).map((it) => ({
    id: it.id,
    word: it.word,
    translate: it.translate,
  })),
  status: card.status,
})

const itemToCreatePayload = (item: IItem) => ({
  language: item.language,
  description: item.description,
  status: item.status,
  items: item.items.map((it) => ({ word: it.word, translate: it.translate })),
})

const itemToUpdatePayload = (item: Partial<IItem>) => ({
  language: item.language ?? '',
  description: item.description ?? '',
  items: (item.items ?? []).map((it) => ({
    word: it.word,
    translate: it.translate,
  })),
})

const toSortParam = (
  sortDate: FilterMain['sortDate']
): 'date_asc' | 'date_desc' => (sortDate === 'asc' ? 'date_asc' : 'date_desc')

const toListQuery = (params: GetItemsParams) => {
  const limit = params.limitCount ?? 20
  const page = params.page ?? 1
  const status = params.filter?.status

  return {
    search: params.filter?.search,
    status: status && status !== 'ALL' ? status : undefined,
    languages: params.filter?.filter?.languages,
    sort: toSortParam(params.filter?.filter?.sortDate),
    // при all=true бэкенд сам игнорирует limit/offset, поэтому их вообще не шлём
    ...(params.all ? { all: true } : { limit, offset: (page - 1) * limit }),
  }
}

export const cardsServices = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // получение списка — все страницы одного фильтра копятся в одной записи кэша
    getItems: build.query<GetItemsRequest, GetItemsParams>({
      async queryFn(params) {
        const result = await cardsService.list(toListQuery(params))

        if (!result.ok) return toRtkQueryResult<GetItemsRequest>(result)

        const { items, total, offset, has_more: hasMore } = result.data

        // TODO: при params.all === true бэкенд может вернуть has_more: true,
        // только если пользователь превысил safety-кап в 5000 карточек —
        // в этом крайне маловероятном случае клиент сейчас не подгружает
        // остаток постранично (caller'ы all-режима не запрашивают следующую
        // страницу). При необходимости можно повторно использовать
        // lastVisible ниже так же, как это уже сделано для обычной пагинации.
        return {
          data: {
            items: items.map(cardToItem),
            total,
            lastVisible: hasMore ? offset + items.length : undefined,
          },
        }
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const { filter, limitCount, all } = queryArgs
        return `${endpointName}/${JSON.stringify({ filter, limitCount, all })}`
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
        const { data: created } = await queryFulfilled.catch(() => ({
          data: null,
        }))
        if (!created) return

        // CARDS_CREATED теперь считается бэкендом сам внутри хендлера создания
        // карточки — клиентский POST /events для card_created больше не
        // нужен (и будет отклонён бэкендом 400-й ошибкой)

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
      async queryFn({ id, updatedData }) {
        const result = await cardsService.update(
          id,
          itemToUpdatePayload(updatedData)
        )
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(result.data) }
      },
      async onQueryStarted(_arg, { dispatch, getState, queryFulfilled }) {
        const { data: updated } = await queryFulfilled.catch(() => ({
          data: null,
        }))
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
      async queryFn({ id, status }) {
        const result = await cardsService.updateStatus(id, status)
        if (!result.ok) return toRtkQueryResult<IItem>(result)
        return { data: cardToItem(result.data) }
      },
      // смена статуса карточки может пересечь порог достижения по метрике
      // CARDS_READY — просим перечитать список достижений
      invalidatesTags: ['achievements'],
      async onQueryStarted(
        { id, status },
        { dispatch, getState, queryFulfilled }
      ) {
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
          return selected.data?.items.find((it) => it.id === id)
        }, undefined)

        const patches = knownItem
          ? cachedArgs.map((args) => {
              const optimisticItem = { ...knownItem, status }
              const filterStatus = args.filter?.status
              const matchesFilter =
                !filterStatus ||
                filterStatus === 'ALL' ||
                filterStatus === status

              return dispatch(
                cardsServices.util.updateQueryData(
                  'getItems',
                  args,
                  (draft) => {
                    const index = draft.items.findIndex((it) => it.id === id)

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
                  }
                )
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
                !filterStatus ||
                filterStatus === 'ALL' ||
                filterStatus === status

              dispatch(
                cardsServices.util.updateQueryData(
                  'getItems',
                  args,
                  (draft) => {
                    const index = draft.items.findIndex((it) => it.id === id)

                    if (matchesFilter && index === -1) {
                      draft.items.unshift(updated)
                      draft.total += 1
                    } else if (!matchesFilter && index !== -1) {
                      draft.items.splice(index, 1)
                      draft.total -= 1
                    }
                  }
                )
              )
            })
          }
        } catch {
          patches.forEach((patch) => patch.undo())
        }
      },
    }),
    // удаление элемента — оптимистичное обновление с rollback
    deleteItem: build.mutation<
      { success: boolean; id: number },
      DeleteItemParams
    >({
      async queryFn({ id }) {
        const result = await cardsService.remove(id)
        if (!result.ok)
          return toRtkQueryResult<{ success: boolean; id: number }>(result)
        return { data: { success: true, id } }
      },
      async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
        const cachedArgs = cardsServices.util.selectCachedArgsForQuery(
          getState(),
          'getItems'
        )
        const patches = cachedArgs.map((args) =>
          dispatch(
            cardsServices.util.updateQueryData('getItems', args, (draft) => {
              draft.items = draft.items.filter((it) => it.id !== id)
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
