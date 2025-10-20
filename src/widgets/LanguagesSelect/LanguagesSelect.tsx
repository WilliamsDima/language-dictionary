import React, { FC, memo, useState } from 'react'
import { Image, TouchableOpacity, ViewStyle } from 'react-native'
import { styles } from './LanguagesSelect.styles'
import Text from '@/shared/UI/Text/Text'
import EarthIcon from '@/assets/icons/UI/earth.svg'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/json/languages'
import { COLORS } from '@/assets/styles/colors'
import { useTranslation } from '@/shared/i18n/types'

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

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const onSelectLanguage = (lang: ILanguage) => {
    onSelect && onSelect(lang)
    setShowModal(false)
  }

  return (
    <>
      <TouchableOpacity
        style={[
          styles.select,
          error && { backgroundColor: COLORS.red },
          classes?.select,
        ]}
        onPress={openModal}
      >
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
        setVisible={setShowModal}
        visible={showModal}
        onSelect={onSelectLanguage}
        language={language}
      />
    </>
  )
}

export default memo(LanguagesSelect)
