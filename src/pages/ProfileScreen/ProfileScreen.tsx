import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo, useState, useCallback } from 'react'
import { ScrollView, View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppSelector } from '@/shared/hooks/useStore'
import { isShowModalYearResult } from '@/shared/constants/app'
import { useActions } from '@/shared/hooks/useActions'
import { useTranslation } from '@/shared/i18n/types'
import { useGetItems } from '@/shared/hooks/useGetItems'
import Text from '@/shared/UI/Text/Text'
import { dateFormat } from '@/shared/helpers/dateFormat'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import LinearGradient from 'react-native-linear-gradient'
import { Icon } from '@/assets/icons/Icon'
import { useUnistyles } from 'react-native-unistyles'

const ProfileScreen: FC = () => {
  const { navigate } = useAppNavigation()
  const { t } = useTranslation()
  const { setShowYearResult } = useActions()
  const { firebaseData } = useAppSelector((store) => store.user)
  const { theme } = useUnistyles()

  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  useGetItems()

  const achievementsPreview = useMemo(() => {
    return [
      {
        id: '1',
        title: t('profileScreen.achievements_preview_1'),
        colors: ['#FEE140', '#FDADC5'],
      },
      {
        id: '2',
        title: t('profileScreen.achievements_preview_2'),
        colors: ['#92FE9D', '#FAFFD1'],
      },
      {
        id: '3',
        title: t('profileScreen.achievements_preview_3'),
        colors: ['#3A7BD5', '#B5FFFC'],
      },
      {
        id: '4',
        title: t('profileScreen.achievements_preview_4'),
        colors: ['#191654', '#DD2476'],
      },
    ]
  }, [t])

  const registrationDate = useMemo(() => {
    return dateFormat({ date: firebaseData?.dateRegistration, type: 'FULL' })
  }, [firebaseData?.dateRegistration])

  const showModalLogout = useCallback(() => {
    setModalLogout(true)
  }, [])

  const showModalDelete = useCallback(() => {
    setModalDelete(true)
  }, [])

  const onShowModalYearResult = useCallback(() => {
    setShowYearResult(true)
  }, [setShowYearResult])

  const openAchievements = useCallback(() => {
    navigate(RoutesNames.achievements)
  }, [navigate])

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <View style={styles.metaCard}>
          <Text style={styles.metaLabel}>
            {t('profileScreen.date_registration')}
          </Text>
          <Text style={styles.metaValue}>
            {registrationDate || 'Не указана'}
          </Text>
        </View>

        <UserStatistic />

        <View style={styles.achievementsBlock}>
          <View style={styles.achievementsHeader}>
            <Text style={styles.achievementsTitle}>
              {t('profileScreen.achievements')}
            </Text>

            <Button
              classes={{ btn: styles.achievementsArrowBtn }}
              onPress={openAchievements}
              isText={false}
            >
              <Icon
                kind="svg"
                name="arrow-top-white-64"
                width={28}
                height={28}
                color={theme.colors.icon.primary}
                style={styles.achievementsArrow}
              />
            </Button>
          </View>

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
                  <Text style={styles.achievementPreviewTitle}>
                    {item.title}
                  </Text>
                </LinearGradient>
              )
            })}
          </ScrollView>
        </View>

        {isShowModalYearResult && (
          <Button
            classes={{ btn: styles.repeatBtn, textBtn: styles.repeatText }}
            onPress={onShowModalYearResult}
          >
            {t('profileScreen.show_year_result', {
              date: new Date().getFullYear(),
            })}
          </Button>
        )}

        <Button
          classes={{ btn: styles.logout, textBtn: styles.dangerText }}
          onPress={showModalLogout}
        >
          {t('profileScreen.logout')}
        </Button>

        <Button
          classes={{ btn: styles.delete, textBtn: styles.deleteText }}
          onPress={showModalDelete}
          type="BORDER-TRANSPARENT"
        >
          {t('profileScreen.delete_account')}
        </Button>
      </View>
      <ModalDeleteAccaunt visible={modalDelete} setVisible={setModalDelete} />
      <ModalLogout visible={modalLogout} setVisible={setModalLogout} />
    </Layout>
  )
}

export default ProfileScreen
