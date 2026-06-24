import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { Icon } from '@/assets/icons/Icon'
import { useUnistyles } from 'react-native-unistyles'

interface Props {
  onPress: () => void
}

const MainFilter: FC<Props> = ({ onPress }) => {
  const { filterMain } = useAppSelector((store) => store.items)
  const { theme } = useUnistyles()
  const isActive = !!filterMain?.sortDate || !!filterMain?.languages?.length

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        kind="svg"
        name={isActive ? 'filter-primery-64' : 'filter-white-64'}
        width={30}
        height={30}
        color={
          isActive ? theme.colors.action.primary : theme.colors.icon.primary
        }
      />
    </TouchableOpacity>
  )
}

export default MainFilter
