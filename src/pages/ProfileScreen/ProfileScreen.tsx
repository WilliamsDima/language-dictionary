import Layout from '@/shared/UI/Layout/Layout'
import Text from '@/shared/UI/Text/Text'
import { useAuth } from '@/shared/hooks/useAuth'
import React, { FC } from 'react'

const ProfileScreen: FC = () => {
  const { logoutHandler } = useAuth()
  return (
    <Layout>
      <Text style={{ marginTop: 50 }} onPress={logoutHandler}>
        выйти
      </Text>
    </Layout>
  )
}

export default ProfileScreen
