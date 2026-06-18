import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './AchievementsScreen.styles'
import Text from '@/shared/UI/Text/Text'
import LinearGradient from 'react-native-linear-gradient'
import { useTranslation } from '@/shared/i18n/types'

const AchievementsScreen: FC = () => {
  const { t } = useTranslation()

  const achievements = useMemo(() => {
    return [
      {
        id: '1',
        title: t('profileScreen.achievements_preview_1'),
        subtitle: 'Добавляйте карточки каждый день и собирайте серию',
        colors: ['#FEE140', '#FDADC5'],
      },
      {
        id: '2',
        title: t('profileScreen.achievements_preview_2'),
        subtitle: 'Открывается за большую коллекцию слов и выражений',
        colors: ['#92FE9D', '#FAFFD1'],
      },
      {
        id: '3',
        title: t('profileScreen.achievements_preview_3'),
        subtitle: 'Появится после первых уверенно выученных карточек',
        colors: ['#3A7BD5', '#B5FFFC'],
      },
      {
        id: '4',
        title: t('profileScreen.achievements_preview_4'),
        subtitle: 'Отмечает регулярную практику и возвращение в приложение',
        colors: ['#191654', '#DD2476'],
      },
    ]
  }, [t])

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{t('profileScreen.achievements')}</Text>
          <Text style={styles.heroText}>
            Здесь будут собираться ваши награды, прогресс и приятные поводы
            возвращаться к карточкам.
          </Text>
        </View>

        <View style={styles.list}>
          {achievements.map((item) => {
            return (
              <LinearGradient
                key={item.id}
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {t('profileScreen.achievements_soon')}
                  </Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardText}>{item.subtitle}</Text>
              </LinearGradient>
            )
          })}
        </View>
      </View>
    </Layout>
  )
}

export default AchievementsScreen
