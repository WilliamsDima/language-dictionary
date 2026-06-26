import React, { FC, memo } from 'react'
import { styles } from './LanguageNativeStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from '../LanguageStatisticItem/LanguageStatisticItem'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  onOpenLanguages: () => void
  setIsNativeLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

const LanguageNativeStatistic: FC<Props> = ({
  setIsNativeLanguage,
  onOpenLanguages,
}) => {
  const { t } = useTranslation()
  const native_language = useAppSelector((store) => store.user.native_language)

  return (
    <>
      <Text style={styles.itemText}>{t('profileScreen.native_language')}</Text>

      {native_language ? (
        <LanguageStatisticItem item={native_language} />
      ) : (
        <Text style={[styles.languagesText, styles.languagesTextEmpty]}>
          {t('profileScreen.languages_studied_not_select')}
        </Text>
      )}

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          setIsNativeLanguage(true)
          onOpenLanguages()
        }}
      >
        <EditIcon width={20} height={20} />
      </TouchableOpacity>
    </>
  )
}

export default memo(LanguageNativeStatistic)
