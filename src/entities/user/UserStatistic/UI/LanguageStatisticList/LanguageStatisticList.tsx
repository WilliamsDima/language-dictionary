import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './LanguageStatisticList.styles'
import Text from '@/shared/UI/Text/Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from '../LanguageStatisticItem/LanguageStatisticItem'
import { useTranslation } from '@/shared/i18n/types'
import { useMeProfile } from '@/shared/hooks/useMeProfile'

type Props = {
  onOpenLanguages: () => void
  setIsNativeLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

const LanguageStatisticList: FC<Props> = ({
  setIsNativeLanguage,
  onOpenLanguages,
}) => {
  const { t } = useTranslation()
  const { data: profile } = useMeProfile()

  return (
    <>
      {profile?.languages?.length ? (
        <View style={styles.languages}>
          <Text style={styles.itemText}>
            {t('profileScreen.languages_studied')}
          </Text>
          {profile?.languages.map((item) => {
            return <LanguageStatisticItem key={item.id} item={item} />
          })}

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setIsNativeLanguage(false)
              onOpenLanguages()
            }}
          >
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.itemText}>
            {t('profileScreen.languages_studied')}
          </Text>
          <Text style={[styles.languagesText, styles.languagesTextEmpty]}>
            {t('profileScreen.languages_studied_not_select')}
          </Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => {
              setIsNativeLanguage(false)
              onOpenLanguages()
            }}
          >
            <EditIcon width={20} height={20} />
          </TouchableOpacity>
        </>
      )}
    </>
  )
}

export default memo(LanguageStatisticList)
