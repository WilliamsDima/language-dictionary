import React, { FC } from 'react'
import { styles } from './SearchWords.styles'
import SearchInput from '@/shared/UI/SearchInput/SearchInput'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'

interface Props {}

const SearchWords: FC<Props> = (props) => {
  const { setSearch } = useActions()
  const { search } = useAppSelector((store) => store.items)
  return (
    <SearchInput
      classes={{
        input: styles.input,
        wrapper: styles.wrapper,
      }}
      value={search}
      onChangeText={setSearch}
    />
  )
}

export default SearchWords
