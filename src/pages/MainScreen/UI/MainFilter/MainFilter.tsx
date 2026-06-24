import React, { FC, useMemo } from 'react'
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
  const isActive = useMemo(() => !!filterMain?.languages?.length, [filterMain])
  const name = useMemo(
    () => (isActive ? 'filter-primery-64' : 'filter-white-64'),
    [isActive]
  )
  const color = useMemo(
    () => (isActive ? theme.colors.action.primary : theme.colors.icon.primary),
    [isActive]
  )

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon kind="svg" name={name} width={30} height={30} color={color} />
    </TouchableOpacity>
  )
}

export default MainFilter
