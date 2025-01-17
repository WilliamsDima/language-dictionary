import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import FilterWhite from '@/assets/icons/UI/filter-white-64.svg'
import FilterPrimery from '@/assets/icons/UI/filter-primery-64.svg'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import MainFilterModal from '../MainFilterModal/MainFilterModal'

interface Props {}

const MainFilter: FC<Props> = () => {
  const { setShowFilterMain } = useActions()
  const { filterMain } = useAppSelector((store) => store.items)

  return (
    <>
      <TouchableOpacity onPress={() => setShowFilterMain(true)}>
        {!!filterMain?.sortDate || !!filterMain?.languages?.length ? (
          <FilterPrimery width={30} height={30} />
        ) : (
          <FilterWhite width={30} height={30} />
        )}
      </TouchableOpacity>

      <MainFilterModal />
    </>
  )
}

export default MainFilter
