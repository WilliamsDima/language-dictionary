import React, { FC, memo, useState } from 'react'
import { Image, TouchableOpacity, ViewStyle } from 'react-native'
import { styles } from './LanguagesSelect.styles'
import Text from '@/shared/UI/Text/Text'
import EarthIcon from '@/assets/icons/UI/earth.svg'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/json/languages'
import { COLORS } from '@/assets/styles/colors'

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
          {language ? language.full_name : 'Выбор языка'}
        </Text>

        {language ? (
          <Image style={styles.flag} source={{ uri: language.country.flag }} />
        ) : (
          <EarthIcon width={25} height={25} />
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>Язык не выбран</Text>}

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
