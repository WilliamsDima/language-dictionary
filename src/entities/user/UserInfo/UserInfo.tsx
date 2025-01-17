import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './UserInfo.styles'
import UserAvatart from '@/shared/UI/UserAvatart/UserAvatart'
import Text from '@/shared/UI/Text/Text'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { useAppSelector } from '@/shared/hooks/useStore'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserInfo: FC<Props> = (props) => {
  const { firebaseData } = useAppSelector((store) => store.user)

  return (
    <View style={styles.wrapper}>
      <UserAvatart
        uri={firebaseData?.image || ''}
        name={firebaseData?.name || ''}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{firebaseData?.name}</Text>
        <Text style={styles.date}>
          Дата регистрации:{' '}
          {dateFormat({ date: firebaseData?.dateRegistration, type: 'FULL' })}
        </Text>
      </View>
    </View>
  )
}

export default memo(UserInfo)
