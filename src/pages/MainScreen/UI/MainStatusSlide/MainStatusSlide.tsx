import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import type { StatusItem } from '@/entities/Item/model/item'
import MainList from '@/widgets/MainList/UI/MainList/MainList'
import type { MainButtonSideValue } from '@/shared/store/slice/userSlice'
import type { ILanguage } from '@/shared/API/services/languages/types'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useDebouncedValue } from '@/shared/hooks/useDebounce'
import { useGetItemsQuery } from '../../api/cardsServices'

const SEARCH_DEBOUNCE_MS = 400

type Props = {
  status: StatusItem
  mainButtonSide: MainButtonSideValue
  languagesByCode: Map<string, ILanguage>
}

const MainStatusSlide: FC<Props> = ({
  status,
  mainButtonSide,
  languagesByCode,
}) => {
  const { isAuth } = useAppSelector((store) => store.app)
  const { search, filterMain } = useAppSelector((store) => store.items)

  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)

  const queryArgs = useMemo(
    () => ({
      filter: {
        status,
        search: debouncedSearch,
        filter: {
          sortDate: filterMain?.sortDate || 'desc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
    }),
    [status, debouncedSearch, filterMain?.sortDate, filterMain?.languages, page]
  )

  const { data, isFetching, refetch } = useGetItemsQuery(queryArgs, {
    skip: !isAuth,
  })

  const items = useMemo(() => data?.items ?? null, [data?.items])

  const isInitialLoading = useMemo(
    () => isFetching && !items,
    [isFetching, items]
  )
  const isLoadingMore = useMemo(
    () => isFetching && !!items,
    [isFetching, items]
  )

  const isFilterActive = useMemo(() => {
    return (
      status !== 'ALL' || !!debouncedSearch || !!filterMain?.languages?.length
    )
  }, [debouncedSearch, filterMain?.languages?.length, status])

  const loadMoreItems = useCallback(() => {
    if (isFetching || !data?.lastVisible) return
    setPage((prev) => prev + 1)
  }, [isFetching, data?.lastVisible])

  // pull-to-refresh: список мог поменяться вне приложения (например, импорт
  // карточек в админке пересоздаёт их с новыми id) — перечитываем первую
  // страницу; если уже подгружено несколько страниц, сброс page на 1 сам
  // перезапросит список (forceRefetch по смене page, merge заменит items)
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)

    try {
      if (page === 1) {
        await refetch()
      } else {
        setPage(1)
      }
    } finally {
      setIsRefreshing(false)
    }
  }, [page, refetch])

  useEffect(() => {
    setPage(1)
  }, [status, debouncedSearch, filterMain?.sortDate, filterMain?.languages])

  return (
    <MainList
      count={data?.total ?? 0}
      isFilterActive={isFilterActive}
      isInitialLoading={isInitialLoading}
      isLoadingMore={isLoadingMore}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      items={items}
      languagesByCode={languagesByCode}
      loadMoreItems={loadMoreItems}
      side={mainButtonSide}
    />
  )
}

export default MainStatusSlide
