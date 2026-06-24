import React, { FC, memo } from 'react'
import { styles } from './SearchInput.styles'
import Input, { InputProps } from '../Input/Input'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from '@/shared/i18n/types'
import { useUnistyles } from 'react-native-unistyles'
import { Icon } from '@/assets/icons/Icon'

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
  const { theme } = useUnistyles()

  return (
    <Input
      placeholder={t('ui.search')}
      {...rest}
      rightIcon={
        showIcon && !rest.value?.trim().length ? (
          <Icon
            kind="svg"
            name="search"
            width={22}
            height={22}
            color={theme.colors.text.placeholder}
          />
        ) : (
          <TouchableOpacity
            style={styles.clear}
            onPress={() => {
              rest?.onChangeText!('')
            }}
          >
            <Icon kind="svg" name="close-red-64" width={15} height={15} />
          </TouchableOpacity>
        )
      }
    />
  )
}

export default memo(SearchInput)
