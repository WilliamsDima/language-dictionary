import React, {
  FC,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { StatusItem } from '@/entities/Item/model/item'
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

  const deferredSearch = useDeferredValue(search)

  const queryArgs = useMemo(
    () => ({
      filter: {
        status,
        search: deferredSearch,
        filter: {
          sortDate: filterMain?.sortDate || 'desc',
          languages: filterMain?.languages,
        },
      },
      limitCount: 10,
      page,
    }),
    [status, deferredSearch, filterMain?.sortDate, filterMain?.languages, page]
  )

  const { data, isFetching } = useGetItemsQuery(queryArgs, {
    skip: !isAuth,
  })

  const items = data?.items ?? null

  const isFilterActive = useMemo(() => {
    return (
      status !== 'ALL' || !!deferredSearch || !!filterMain?.languages?.length
    )
  }, [deferredSearch, filterMain?.languages?.length, status])

  const loadMoreItems = useCallback(() => {
    if (isFetching || !data?.lastVisible) return
    setPage((prev) => prev + 1)
  }, [isFetching, data?.lastVisible])

  useEffect(() => {
    setPage(1)
  }, [status, deferredSearch, filterMain?.sortDate, filterMain?.languages])

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
