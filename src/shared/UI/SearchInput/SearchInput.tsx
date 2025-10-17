import React, { FC, memo } from 'react'
import { styles } from './SearchInput.styles'
import Input, { InputProps } from '../Input/Input'
import SearchIcon from '@/assets/icons/UI/search.svg'
import ClearIcon from '@/assets/icons/UI/close-red-64.svg'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'

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
  const { t } = useTranslation()

  return (
    <Input
      placeholder={t('ui.search')}
      {...rest}
      rightIcon={
        showIcon && !rest.value?.trim().length ? (
          <SearchIcon />
        ) : (
          <TouchableOpacity
            style={styles.clear}
            onPress={() => {
              rest?.onChangeText!('')
            }}
          >
            <ClearIcon width={15} height={15} />
          </TouchableOpacity>
        )
      }
    />
  )
}

export default memo(SearchInput)
