import React, { FC, memo } from 'react'
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

const UserInfo: FC<Props> = (props) => {
  const { t } = useTranslation()
  const { data: profile } = useMeProfile()

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
          {dateFormat({ date: profile?.dateRegistration, type: 'FULL' })}
        </Text>
      </View>
    </View>
  )
}

export default memo(UserInfo)
