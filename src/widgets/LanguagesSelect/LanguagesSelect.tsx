import React, { FC, memo, useCallback, useMemo } from 'react'
import { Image, TouchableOpacity, ViewStyle } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './LanguagesSelect.styles'
import Text from '@/shared/UI/Text/Text'
import EarthIcon from '@/assets/icons/UI/earth.svg'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/json/languages'
import { useTranslation } from '@/shared/i18n/types'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'

/**
 * UI select language
 *
 * @format
 */

type Props = {
  classes?: {
    select?: ViewStyle | ViewStyle[]
  }
  onSelect?: (lang: ILanguage) => void
  language?: ILanguage
  error?: boolean
}

const LanguagesSelect: FC<Props> = ({ classes, onSelect, language, error }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const [sheetRef, presentSheet] = useBottomSheet()

  const selectStyles = useMemo(() => {
    return [
      styles.select,
      error
        ? {
            borderColor: theme.colors.palette.red,
            borderWidth: theme.size.s1,
          }
        : null,
      classes?.select,
    ]
  }, [classes?.select, error, theme.colors.palette.red])

  const openModal = () => {
    presentSheet()
  }

  const onSelectLanguage = (lang: ILanguage) => {
    onSelect && onSelect(lang)
  }

  const onConfirmLanguage = useCallback(
    (langs: ILanguage[]) => {
      const selectedLanguage = langs[0]

      if (selectedLanguage) {
        onSelectLanguage(selectedLanguage)
      }
    },
    [onSelect]
  )

  return (
    <>
      <TouchableOpacity style={selectStyles} onPress={openModal}>
        <Text style={styles.title}>
          {language ? language.full_name : t('ui.language_selection')}
        </Text>

        {language ? (
          <Image style={styles.flag} source={{ uri: language.country.flag }} />
        ) : (
          <EarthIcon width={25} height={25} />
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{t('ui.language_not_select')}</Text>}

      <ModalLanguagesList
        sheetRef={sheetRef}
        multiselect={false}
        closeOnSelect
        withFooter={false}
        selects={language ? [language] : []}
        subtitle="Выбери язык карточки для нового набора"
        onConfirm={onConfirmLanguage}
      />
    </>
  )
}

export default memo(LanguagesSelect)
