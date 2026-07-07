import React, { FC, useMemo } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import { Icon } from '@/assets/icons/Icon'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'
import { useAchievements } from '@/shared/hooks/useAchievements'
import { styles } from './ProfileAchievements.styles'
import AchievementPreviewCard from './UI/AchievementPreviewCard/AchievementPreviewCard'

type Props = {
  onPress: () => void
}

const PREVIEW_ACHIEVEMENTS_COUNT = 6

const ProfileAchievements: FC<Props> = ({ onPress }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  const { data } = useAchievements()

  const achievementsPreview = useMemo(() => {
    return (data ?? []).slice(0, PREVIEW_ACHIEVEMENTS_COUNT)
  }, [data])

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
            <AchievementPreviewCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              colorFrom={item.color_from}
              colorTo={item.color_to}
              unlocked={item.unlocked}
              progressPercent={item.progress_percent}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ProfileAchievements
