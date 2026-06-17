import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import FilterWhite from '@/assets/icons/UI/filter-white-64.svg'
import FilterPrimery from '@/assets/icons/UI/filter-primery-64.svg'
import { useAppSelector } from '@/shared/hooks/useStore'

interface Props {
  onPress: () => void
}

const MainFilter: FC<Props> = ({ onPress }) => {
  const { filterMain } = useAppSelector((store) => store.items)

  return (
    <TouchableOpacity onPress={onPress}>
      {!!filterMain?.sortDate || !!filterMain?.languages?.length ? (
        <FilterPrimery width={30} height={30} />
      ) : (
        <FilterWhite width={30} height={30} />
      )}
    </TouchableOpacity>
  )
}

export default MainFilter
