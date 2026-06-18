import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './UserStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/pages/ProfileScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import ModalLanguagesList from '@/features/ModalLanguagesList/ModalLanguagesList'
import { ILanguage } from '@/shared/json/languages'
import { formatNumberWithSpaces } from '@/shared/helpers/numberFormats'
import Loader from '@/shared/UI/Loader/Loader'
import { useTranslation } from '@/shared/i18n/types'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import LanguageStatisticItem from './UI/LanguageStatisticItem/LanguageStatisticItem'
import LinearGradient from 'react-native-linear-gradient'

type StatisticCardProps = {
  label: string
  value: string | number
  colors: string[]
}

const StatisticCard = memo(({ label, value, colors }: StatisticCardProps) => {
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
      <Text style={styles.statCardValue}>{value}</Text>
      <Text style={styles.statCardLabel}>{label}</Text>
    </LinearGradient>
  )
})

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
  const { firebaseData } = useAppSelector((store) => store.user)
  const { items } = useAppSelector((store) => store.items)

  const [isNativeLanguage, setIsNativeLanguage] = useState(false)
  const [languagesSheetRef, presentLanguagesSheet, onDismissLanguagesSheet] =
    useBottomSheet()

  const { data: profile, isLoading: isLoadingProfile } = useGetUserProfileQuery(
    firebaseData?.uid
  )
  const [updateUserProfile] = useUpdateUserProfileMutation()

  const loading = useMemo(() => {
    return isLoadingProfile
  }, [isLoadingProfile])

  const allWordsCount = useMemo(() => {
    if (items) {
      return formatNumberWithSpaces(
        Object.values(items).reduce((prev, next) => prev + next.items.length, 0)
      )
    }

    return '0'
  }, [items])

  const allWordsReady = useMemo(() => {
    if (items) {
      return formatNumberWithSpaces(
        Object.values(items).reduce((prev, next) => {
          return prev + (next.status === 'READY' ? next.items.length : 0)
        }, 0)
      )
    }

    return '0'
  }, [items])

  const allWordsStady = useMemo(() => {
    if (items) {
      return formatNumberWithSpaces(
        Object.values(items).reduce((prev, next) => {
          return prev + (next.status === 'STUDY' ? next.items.length : 0)
        }, 0)
      )
    }

    return '0'
  }, [items])

  const statisticsCards = useMemo(() => {
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
        value: Object.keys(items)?.length || 0,
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
    ]
  }, [allWordsCount, allWordsReady, allWordsStady, items, t])

  const languageSelects = useMemo(() => {
    if (isNativeLanguage) {
      return profile?.native_language ? [profile.native_language] : []
    }

    return profile?.languages || []
  }, [isNativeLanguage, profile?.languages, profile?.native_language])

  const onSelectLanguages = useCallback(
    (langs: ILanguage[]) => {
      if (firebaseData && profile) {
        if (isNativeLanguage) {
          updateUserProfile({
            data: { ...profile, native_language: langs[0] || null },
            uid: firebaseData.uid,
          })
        } else {
          updateUserProfile({
            data: { ...profile, languages: langs },
            uid: firebaseData.uid,
          })
        }
      }
    },
    [firebaseData, isNativeLanguage, profile, updateUserProfile]
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
            {profile?.native_language ? (
              <LanguageStatisticItem item={profile.native_language} />
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
