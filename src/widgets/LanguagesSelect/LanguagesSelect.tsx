import React, { FC, memo, useCallback, useMemo } from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './LanguagesSelect.styles'
import Text from '@/shared/UI/Text/Text'
import EarthIcon from '@/assets/icons/UI/earth.svg'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/API/services/languages/types'
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
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()

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
  }, [classes?.select, error, theme.colors.palette.red, theme.size.s1])

  const openModal = useCallback(() => {
    presentSheet()
  }, [presentSheet])

  const onSelectLanguage = useCallback(
    (lang: ILanguage) => {
      onSelect?.(lang)
    },
    [onSelect]
  )

  const onConfirmLanguage = useCallback(
    (langs: ILanguage[]) => {
      const selectedLanguage = langs[0]

      if (selectedLanguage) {
        onSelectLanguage(selectedLanguage)
      }
    },
    [onSelectLanguage]
  )

  return (
    <>
      <TouchableOpacity style={selectStyles} onPress={openModal}>
        <Text style={styles.title}>
          {language ? language.name : t('ui.language_selection')}
        </Text>

        {language ? (
          <Text style={styles.flag}>{language.emoji}</Text>
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
        onDismiss={dismissSheet}
        onConfirm={onConfirmLanguage}
      />
    </>
  )
}

export default memo(LanguagesSelect)
