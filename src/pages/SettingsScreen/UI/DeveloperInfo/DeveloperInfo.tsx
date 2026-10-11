import Text from '@/shared/UI/Text/Text'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './DeveloperInfo.styles'
import { useTranslation } from '@/shared/i18n/types'
import { useGetAppConfigQuery } from '@/shared/API/services/appConfig/AppConfigQuery'
import SocialItem from './UI/SocialItem/SocialItem'

// ссылка на автора (developer) больше не показывается — блок состоит только
// из соц. сетей из app config (socials, редактируются в админке)
const DeveloperInfo: FC = () => {
  const { t } = useTranslation()

  const { data: appConfig } = useGetAppConfigQuery()

  const socials = useMemo(() => {
    const list = appConfig?.socials

    return Array.isArray(list)
      ? list.filter((item) => !!item?.link && !!item?.name)
      : []
  }, [appConfig])

  return socials.length ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t('settingsScreen.developerInfo.title')}
      </Text>

      <Text style={styles.subtitle}>
        {t('settingsScreen.developerInfo.socials.title')}
      </Text>

      {socials.map((item, index) => {
        return (
          <SocialItem
            key={`${index}-${item.id}`}
            link={item.link}
            icon={item.icon}
            name={item.name}
          />
        )
      })}
    </View>
  ) : (
    <></>
  )
}

export default DeveloperInfo
