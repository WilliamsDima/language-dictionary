import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './UserInfo.styles'
import UserAvatart from '@/shared/UI/UserAvatart/UserAvatart'
import { useAuth } from '@/shared/hooks/useAuth'
import Text from '@/shared/UI/Text/Text'
import { dateFormat } from '@/shared/helpers/dateFormat'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserInfo: FC<Props> = (props) => {
  const { user, firebaseData } = useAuth()

  return (
    <View style={styles.wrapper}>
      <UserAvatart uri={user?.photoURL || ''} name={user?.displayName || ''} />

      <View style={styles.info}>
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.date}>
          Дата регистрации:{' '}
          {dateFormat({ date: firebaseData?.dateRegistration, type: 'FULL' })}
        </Text>
      </View>
    </View>
  )
}

export default memo(UserInfo)
