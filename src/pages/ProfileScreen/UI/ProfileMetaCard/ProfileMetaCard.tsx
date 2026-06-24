import React, { FC } from 'react'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './ProfileMetaCard.styles'

type Props = {
  registrationDate?: string
}

const ProfileMetaCard: FC<Props> = ({ registrationDate }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.metaCard}>
      <Text style={styles.metaLabel}>
        {t('profileScreen.date_registration')}
      </Text>
      <Text style={styles.metaValue}>{registrationDate || 'Не указана'}</Text>
    </View>
  )
}

export default ProfileMetaCard
