import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './UserInfo.styles'
import UserAvatart from '@/shared/UI/UserAvatart/UserAvatart'
import Text from '@/shared/UI/Text/Text'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { useMeProfile } from '@/shared/hooks/useMeProfile'
import { useTranslation } from '@/shared/i18n/types'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserInfo: FC<Props> = () => {
  const { t, i18n } = useTranslation()
  const { data: profile } = useMeProfile()

  const registrationDate = useMemo(
    () =>
      dateFormat({
        date: profile?.dateRegistration,
        type: 'FULL',
        locale: i18n.language,
      }),
    [i18n.language, profile?.dateRegistration]
  )

  return (
    <View style={styles.wrapper}>
      <UserAvatart
        uri={profile?.image || ''}
        name={profile?.name || ''}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.date}>
          {t('profileScreen.date_registration')}
          {registrationDate}
        </Text>
      </View>
    </View>
  )
}

export default memo(UserInfo)
