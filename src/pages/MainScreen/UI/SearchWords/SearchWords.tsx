import React, { FC } from 'react'
import { styles } from './SearchWords.styles'
import SearchInput from '@/shared/UI/SearchInput/SearchInput'

interface Props {}

const SearchWords: FC<Props> = (props) => {
  return (
    <SearchInput
      classes={{
        input: styles.input,
        wrapper: styles.wrapper,
      }}
    />
  )
}

export default SearchWords
