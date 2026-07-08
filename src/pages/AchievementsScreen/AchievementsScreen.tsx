import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './AchievementsScreen.styles'
import Text from '@/shared/UI/Text/Text'
import Loader from '@/shared/UI/Loader/Loader'
import Button from '@/shared/UI/Button/Button'
import { useTranslation } from '@/shared/i18n/types'
import { useAchievements } from '@/shared/hooks/useAchievements'
import AchievementCard from './UI/AchievementCard/AchievementCard'
import { useAppReviewGate } from './hooks/useAppReviewGate'

// экран только отображает актуальный список — обнаружение свежих
// разблокировок и показ модалки успеха вынесены в глобальный
// ModalAchievementUnlocked (см. src/features/ModalAchievementUnlocked),
// чтобы это работало независимо от того, открыт ли этот экран
const AchievementsScreen: FC = () => {
  const { t } = useTranslation()

  const { data, isLoading, isError, refetch } = useAchievements()
  useAppReviewGate()

  const achievements = useMemo(() => data ?? [], [data])

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{t('profileScreen.achievements')}</Text>
          <Text style={styles.heroText}>
            Здесь собираются ваши награды, прогресс и приятные поводы
            возвращаться к карточкам.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.loader}>
            <Loader lottieStyles={styles.animLoader} />
          </View>
        ) : (
          <></>
        )}

        {!isLoading && isError ? (
          <View style={styles.errorBlock}>
            <Text style={styles.errorText}>
              Не удалось загрузить достижения. Проверьте соединение и
              попробуйте ещё раз.
            </Text>
            <Button
              type="BORDER-TRANSPARENT"
              classes={{ btn: styles.retryBtn }}
              onPress={refetch}
            >
              Повторить
            </Button>
          </View>
        ) : (
          <></>
        )}

        {!isLoading && !isError ? (
          <View style={styles.list}>
            {achievements.map((item) => {
              return (
                <AchievementCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  colorFrom={item.color_from}
                  colorTo={item.color_to}
                  unlocked={item.unlocked}
                  unlockedAt={item.unlocked_at}
                  progressCurrent={item.progress_current}
                  progressPercent={item.progress_percent}
                  threshold={item.threshold}
                />
              )
            })}
          </View>
        ) : (
          <></>
        )}
      </View>
    </Layout>
  )
}

export default AchievementsScreen
