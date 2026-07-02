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

  const { data, isFetching } = useGetItemsQuery(queryArgs, {
    skip: !isAuth,
  })

  const items = data?.items ?? null

  const isFilterActive = useMemo(() => {
    return (
      status !== 'ALL' || !!debouncedSearch || !!filterMain?.languages?.length
    )
  }, [debouncedSearch, filterMain?.languages?.length, status])

  const loadMoreItems = useCallback(() => {
    if (isFetching || !data?.lastVisible) return
    setPage((prev) => prev + 1)
  }, [isFetching, data?.lastVisible])

  useEffect(() => {
    setPage(1)
  }, [status, debouncedSearch, filterMain?.sortDate, filterMain?.languages])

  return (
    <MainList
      count={data?.total ?? 0}
      isFilterActive={isFilterActive}
      isLoading={isFetching}
      items={items}
      languagesByCode={languagesByCode}
      loadMoreItems={loadMoreItems}
      side={mainButtonSide}
    />
  )
}

export default MainStatusSlide
