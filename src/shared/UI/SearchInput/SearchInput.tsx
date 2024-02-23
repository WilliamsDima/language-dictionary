import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './SearchInput.styles'
import Input, { InputProps } from '../Input/Input'
import SearchIcon from '@/assets/icons/UI/search.svg'

interface Props extends InputProps {
  showIcon?: boolean
}

/**
 * UI Компанента поиска
 *
 * @format
 */

const SearchInput: FC<Props> = (props) => {
  const { showIcon = true, ...rest } = props

  return (
    <Input
      placeholder={'Поиск'}
      {...rest}
      rightIcon={showIcon ? <SearchIcon /> : <></>}
    />
  )
}

export default memo(SearchInput)
