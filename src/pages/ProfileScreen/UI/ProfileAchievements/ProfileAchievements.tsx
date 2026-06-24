import React, { FC, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useUnistyles } from 'react-native-unistyles'
import { Icon } from '@/assets/icons/Icon'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './ProfileAchievements.styles'

type Props = {
  onPress: () => void
}

type AchievementPreview = {
  id: string
  title: string
  colors: [string, string]
}

const ProfileAchievements: FC<Props> = ({ onPress }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const achievementsPreview = useMemo<AchievementPreview[]>(() => {
    return [
      {
        id: '1',
        title: t('profileScreen.achievements_preview_1'),
        colors: [
          theme.colors.palette.gradient_yellow,
          theme.colors.palette.gradient_pink,
        ],
      },
      {
        id: '2',
        title: t('profileScreen.achievements_preview_2'),
        colors: [
          theme.colors.palette.gradient_green,
          theme.colors.palette.gradient_cream,
        ],
      },
      {
        id: '3',
        title: t('profileScreen.achievements_preview_3'),
        colors: [
          theme.colors.palette.gradient_sky,
          theme.colors.palette.gradient_mint,
        ],
      },
      {
        id: '4',
        title: t('profileScreen.achievements_preview_4'),
        colors: [
          theme.colors.palette.gradient_violet,
          theme.colors.palette.gradient_magenta,
        ],
      },
    ]
  }, [t, theme.colors.palette])

  return (
    <View style={styles.achievementsBlock}>
      <TouchableOpacity style={styles.achievementsHeader} onPress={onPress}>
        <Text style={styles.achievementsTitle}>
          {t('profileScreen.achievements')}
        </Text>

        <View style={styles.achievementsArrowBtn}>
          <Icon
            kind="svg"
            name="arrow-top-white-64"
            width={25}
            height={25}
            color={theme.colors.icon.primary}
            style={styles.achievementsArrow}
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.achievementsSubtitle}>
        {t('profileScreen.achievements_subtitle')}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.achievementsList}
      >
        {achievementsPreview.map((item) => {
          return (
            <LinearGradient
              key={item.id}
              colors={item.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.achievementPreviewCard}
            >
              <View style={styles.achievementPreviewBadge}>
                <Text style={styles.achievementPreviewBadgeText}>
                  {t('profileScreen.achievements_soon')}
                </Text>
              </View>

              <Text style={styles.achievementPreviewTitle}>{item.title}</Text>
            </LinearGradient>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ProfileAchievements
