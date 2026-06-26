import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import type { IItem, StatusItem } from '@/entities/Item/model/item'
import MainList from '@/widgets/MainList/UI/MainList/MainList'
import type { MainButtonSideValue } from '@/shared/store/slice/userSlice'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useGetItemsQuery } from '../../api/cardsServices'

type Props = {
  status: StatusItem
  mainButtonSide: MainButtonSideValue
}

const MainStatusSlide: FC<Props> = ({ status, mainButtonSide }) => {
  const { isAuth } = useAppSelector((store) => store.app)
  const { search, filterMain } = useAppSelector((store) => store.items)

  const [page, setPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState(search)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search)
    }, 400)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  useEffect(() => {
    setPage(1)
  }, [status, debouncedSearch, filterMain?.sortDate, filterMain?.languages])

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

  const items = useMemo(() => {
    if (!data?.items) return null

    return data.items.reduce<Record<number, IItem>>((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }, [data?.items])

  const loadMoreItems = useCallback(() => {
    if (isFetching || !data?.lastVisible) return
    setPage((prev) => prev + 1)
  }, [isFetching, data?.lastVisible])

  const isFilterActive = useMemo(() => {
    return (
      status !== 'ALL' || !!debouncedSearch || !!filterMain?.languages?.length
    )
  }, [debouncedSearch, filterMain?.languages?.length, status])

  return (
    <MainList
      count={data?.total ?? 0}
      isFilterActive={isFilterActive}
      isLoading={isFetching}
      items={items}
      loadMoreItems={loadMoreItems}
      side={mainButtonSide}
    />
  )
}

export default MainStatusSlide
