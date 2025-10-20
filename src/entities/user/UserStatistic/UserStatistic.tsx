import React, { FC, memo, useMemo, useState } from 'react'
import { View } from 'react-native'
import { styles } from './UserStatistic.styles'
import Text from '@/shared/UI/Text/Text'
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/pages/ProfileScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import ModalAddLanguages from '@/features/ModalAddLanguages/ModalAddLanguages'
import { ILanguage } from '@/shared/json/languages'
import LanguageStatisticList from './UI/LanguageStatisticList/LanguageStatisticList'
import LanguageNativeStatistic from './UI/LanguageNativeStatistic/LanguageNativeStatistic'
import { formatNumberWithSpaces } from '@/shared/helpers/numberFormats'
import Loader from '@/shared/UI/Loader/Loader'
import { useTranslation } from '@/shared/i18n/types'

/**
 * информация о пользователе
 *
 * @format
 */

type Props = {}

const UserStatistic: FC<Props> = (props) => {
  const { t } = useTranslation()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { items } = useAppSelector((store) => store.items)

  const [showModalLanguages, setShowModalLanguages] = useState(false)
  const [isNativeLanguage, setIsNativeLanguage] = useState(false)

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
    return []
  }, [items])

  const allWordsReady = useMemo(() => {
    if (items) {
      return formatNumberWithSpaces(
        Object.values(items).reduce((prev, next) => {
          return prev + (next.status === 'READY' ? next.items.length : 0)
        }, 0)
      )
    }
    return []
  }, [items])

  const allWordsStady = useMemo(() => {
    if (items) {
      return formatNumberWithSpaces(
        Object.values(items).reduce((prev, next) => {
          return prev + (next.status === 'STUDY' ? 1 : 0)
        }, 0)
      )
    }
    return []
  }, [items])

  const onSelectLanguages = (langs: ILanguage[]) => {
    if (firebaseData && profile) {
      if (isNativeLanguage) {
        updateUserProfile({
          data: { ...profile, native_language: langs[0] || null },
          uid: firebaseData?.uid,
        })
      } else {
        updateUserProfile({
          data: { ...profile, languages: langs },
          uid: firebaseData?.uid,
        })
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.statistic}>{t('profileScreen.statistic')}</Text>

        <View style={styles.item}>
          <Text style={styles.itemText}>
            {t('profileScreen.all_count')} {allWordsCount}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>
            {t('profileScreen.all_count_cards')}{' '}
            {Object.keys(items)?.length || 0}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>
            {t('profileScreen.studied_count')} {allWordsReady}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.itemText}>
            {t('profileScreen.progress_count')} {allWordsStady}
          </Text>
        </View>

        <View style={styles.item}>
          <LanguageStatisticList
            setIsNativeLanguage={setIsNativeLanguage}
            setShowModalLanguages={setShowModalLanguages}
          />
        </View>

        <View style={styles.item}>
          <LanguageNativeStatistic
            setIsNativeLanguage={setIsNativeLanguage}
            setShowModalLanguages={setShowModalLanguages}
          />
        </View>

        <ModalAddLanguages
          setVisible={setShowModalLanguages}
          onConfirm={onSelectLanguages}
          visible={showModalLanguages}
          multiselect={!isNativeLanguage}
          selects={
            isNativeLanguage
              ? profile?.native_language
                ? [profile?.native_language]
                : []
              : profile?.languages
          }
        />
      </View>

      {loading && (
        <View style={[styles.loader]}>
          <Loader lottieStyles={styles.animLoader} />
        </View>
      )}
    </>
  )
}

export default memo(UserStatistic)
