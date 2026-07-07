import React, { FC, ReactNode, memo, useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import LottieView from 'lottie-react-native'
import { styles } from './UserStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import { useUpdateMeLanguagesMutation } from '@/shared/API/services/me/MeQuery'
import { useAllItems } from '@/shared/hooks/useAllItems'
import { useStreakStatus } from '@/shared/hooks/useStreakStatus'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/API/services/languages/types'
import { formatNumberWithSpaces } from '@/shared/helpers/numberFormats'
import Loader from '@/shared/UI/Loader/Loader'
import { useTranslation } from '@/shared/i18n/types'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from './UI/LanguageStatisticItem/LanguageStatisticItem'
import LinearGradient from 'react-native-linear-gradient'
import { useMeProfile } from '@/shared/hooks/useMeProfile'

type StatisticCardProps = {
  label: string
  value: string | number
  colors: string[]
  valueColor?: string
  valueIcon?: ReactNode
}

type StatCardData = {
  id: string
  label: string
  value: string | number
  colors: string[]
  valueColor?: string
  valueIcon?: ReactNode
}

const StatisticCard = memo(
  ({ label, value, colors, valueColor, valueIcon }: StatisticCardProps) => {
    const valueStyle = useMemo(
      () =>
        valueColor
          ? [styles.statCardValue, { color: valueColor }]
          : styles.statCardValue,
      [valueColor]
    )

    return (
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statCard}
      >
        <View style={styles.statCardGlow} />
        <View style={styles.statCardTopRow}>
          <View style={styles.statCardDot} />
          <Text style={styles.statCardCaption}>ПРОГРЕСС</Text>
        </View>
        <View style={styles.statCardValueRow}>
          {valueIcon}
          <Text style={valueStyle}>{value}</Text>
        </View>
        <Text style={styles.statCardLabel}>{label}</Text>
      </LinearGradient>
    )
  }
)

type LanguageCardProps = {
  title: string
  onPress: () => void
  children: React.ReactNode
}

const LanguageCard = memo(({ title, onPress, children }: LanguageCardProps) => {
  return (
    <View style={styles.languageCard}>
      <View style={styles.languageCardHeader}>
        <Text style={styles.languageCardTitle}>{title}</Text>
        <TouchableOpacity style={styles.editBtn} onPress={onPress}>
          <EditIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.languageCardContent}>{children}</View>
    </View>
  )
})

const UserStatistic: FC = () => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()
  const { data: profile } = useMeProfile()
  const { allItems, isLoading: isLoadingItems } = useAllItems()
  const { data: streakStatus } = useStreakStatus()

  const [isNativeLanguage, setIsNativeLanguage] = useState(false)
  const [languagesSheetRef, presentLanguagesSheet, onDismissLanguagesSheet] =
    useBottomSheet()

  const [updateMeLanguages, { isLoading: isSavingLanguages }] =
    useUpdateMeLanguagesMutation()

  const loading = useMemo(() => {
    return isSavingLanguages || isLoadingItems
  }, [isSavingLanguages, isLoadingItems])

  const allWordsCount = useMemo(() => {
    if (allItems) {
      return formatNumberWithSpaces(
        allItems.reduce((prev, next) => prev + next.items.length, 0)
      )
    }

    return '0'
  }, [allItems])

  const allWordsReady = useMemo(() => {
    if (allItems) {
      return formatNumberWithSpaces(
        allItems.reduce((prev, next) => {
          return prev + (next.status === 'READY' ? next.items.length : 0)
        }, 0)
      )
    }

    return '0'
  }, [allItems])

  const allWordsStady = useMemo(() => {
    if (allItems) {
      return formatNumberWithSpaces(
        allItems.reduce((prev, next) => {
          return prev + (next.status === 'STUDY' ? next.items.length : 0)
        }, 0)
      )
    }

    return '0'
  }, [allItems])

  const streakValue = useMemo(
    () => streakStatus?.current_streak ?? 0,
    [streakStatus?.current_streak]
  )

  const streakIcon = useMemo(() => {
    return streakStatus?.completed_today ? (
      <LottieView
        source={require('../../../shared/json/fire.json')}
        autoPlay
        loop
        style={styles.streakIcon}
      />
    ) : (
      <Text style={styles.streakEmoji}>🔥</Text>
    )
  }, [streakStatus?.completed_today])

  const streakValueColor = useMemo(
    () =>
      streakStatus?.completed_today
        ? theme.colors.palette.black
        : 'rgba(4, 7, 13, 0.35)',
    [streakStatus?.completed_today, theme.colors.palette.black]
  )

  const statisticsCards = useMemo<StatCardData[]>(() => {
    return [
      {
        id: 'allWordsCount',
        label: t('profileScreen.all_count_short'),
        value: allWordsCount,
        colors: ['#7CFF6B', '#43D67A'],
      },
      {
        id: 'allCardsCount',
        label: t('profileScreen.all_count_cards_short'),
        value: allItems?.length || 0,
        colors: ['#59B8FF', '#3A7BD5'],
      },
      {
        id: 'allWordsReady',
        label: t('profileScreen.studied_count_short'),
        value: allWordsReady,
        colors: ['#FEE140', '#FFD66B'],
      },
      {
        id: 'allWordsStady',
        label: t('profileScreen.progress_count_short'),
        value: allWordsStady,
        colors: ['#FF6FAE', '#DD2476'],
      },
      {
        id: 'streak',
        label: 'Серия',
        value: streakValue,
        colors: ['#FFD200', '#FFD66B'],
        valueColor: streakValueColor,
        valueIcon: streakIcon,
      },
    ]
  }, [
    allWordsCount,
    allWordsReady,
    allWordsStady,
    allItems,
    t,
    streakValue,
    streakValueColor,
    streakIcon,
  ])

  const languageSelects = useMemo(() => {
    if (isNativeLanguage) {
      return profile?.nativeLanguage ? [profile.nativeLanguage] : []
    }

    return profile?.languages || []
  }, [isNativeLanguage, profile?.languages, profile?.nativeLanguage])

  const onSelectLanguages = useCallback(
    async (langs: ILanguage[]) => {
      try {
        if (isNativeLanguage) {
          await updateMeLanguages({
            languages: profile?.languages?.map((l) => l.id) ?? [],
            nativeLanguageId: langs[0]?.id ?? null,
          }).unwrap()
        } else {
          await updateMeLanguages({
            languages: langs.map((lang) => lang.id),
            nativeLanguageId: profile?.nativeLanguage?.id ?? null,
          }).unwrap()
        }
      } catch {
        // оставляем предыдущие значения, если backend отказал
      }
    },
    [isNativeLanguage, updateMeLanguages, profile]
  )

  const onEditLanguages = useCallback(() => {
    setIsNativeLanguage(false)
    requestAnimationFrame(() => {
      presentLanguagesSheet()
    })
  }, [presentLanguagesSheet])

  const onEditNativeLanguage = useCallback(() => {
    setIsNativeLanguage(true)
    requestAnimationFrame(() => {
      presentLanguagesSheet()
    })
  }, [presentLanguagesSheet])

  const languagesModalSubtitle = useMemo(() => {
    return isNativeLanguage
      ? 'Выбери один основной язык профиля'
      : 'Выбери несколько языков для статистики и подбора карточек'
  }, [isNativeLanguage])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{t('profileScreen.statistic')}</Text>

        <View style={styles.grid}>
          {statisticsCards.map((item) => {
            return (
              <StatisticCard
                key={item.id}
                colors={item.colors}
                label={item.label}
                value={item.value}
                valueColor={item.valueColor}
                valueIcon={item.valueIcon}
              />
            )
          })}
        </View>

        <View style={styles.languagesSection}>
          <LanguageCard
            title={t('profileScreen.languages_studied_card')}
            onPress={onEditLanguages}
          >
            {profile?.languages?.length ? (
              <View style={styles.languagesList}>
                {profile.languages.map((item) => {
                  return <LanguageStatisticItem key={item.id} item={item} />
                })}
              </View>
            ) : (
              <Text style={[styles.emptyText, styles.emptyTextDanger]}>
                {t('profileScreen.languages_studied_not_select')}
              </Text>
            )}
          </LanguageCard>

          <LanguageCard
            title={t('profileScreen.native_language_card')}
            onPress={onEditNativeLanguage}
          >
            {profile?.nativeLanguage ? (
              <LanguageStatisticItem item={profile.nativeLanguage} />
            ) : (
              <Text style={[styles.emptyText, styles.emptyTextDanger]}>
                {t('profileScreen.native_language_not_select')}
              </Text>
            )}
          </LanguageCard>
        </View>

        <ModalLanguagesList
          sheetRef={languagesSheetRef}
          onDismiss={onDismissLanguagesSheet}
          onConfirm={onSelectLanguages}
          multiselect={!isNativeLanguage}
          selects={languageSelects}
          subtitle={languagesModalSubtitle}
          withFooter={!isNativeLanguage}
          closeOnSelect={isNativeLanguage}
        />
      </View>

      {loading && (
        <View style={styles.loader}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      )}
    </>
  )
}

export default memo(UserStatistic)
