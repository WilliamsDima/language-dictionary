import UserInfo from '@/entities/user/UserInfo/UserInfo'
import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useMemo, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { styles } from './ProfileScreen.styles'
import Button from '@/shared/UI/Button/Button'
import ModalLogout from '@/features/ModalLogout/ModalLogout'
import ModalDeleteAccaunt from '@/features/ModalDeleteAccaunt/ModalDeleteAccaunt'
import UserStatistic from '@/entities/user/UserStatistic/UserStatistic'
import { useAppSelector } from '@/shared/hooks/useStore'
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'
import { isShowModalYearResult } from '@/shared/constants/app'
import { useActions } from '@/shared/hooks/useActions'
import { useTranslation } from '@/shared/i18n/types'
import Text from '@/shared/UI/Text/Text'

const ProfileScreen: FC = () => {
  const { t } = useTranslation()
  const { setShowYearResult } = useActions()

  const [modalLogout, setModalLogout] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalCards, setModalCards] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current

  const { items } = useAppSelector((store) => store.items)

  const heroAnimatedStyle = useMemo(() => {
    const translateY = scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [0, -52],
      extrapolate: 'clamp',
    })

    const scale = scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [1, 0.94],
      extrapolate: 'clamp',
    })

    const opacity = scrollY.interpolate({
      inputRange: [0, 64],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    })

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    }
  }, [scrollY])

  const showModalLogout = () => {
    setModalLogout(true)
  }

  const showModalDelete = () => {
    setModalDelete(true)
  }

  const onShowModalYearResult = () => {
    setShowYearResult(true)
  }

  const startRepeat = () => {
    setModalCards(true)
  }

  return (
    <Layout
      isScroll
      scrollViewProps={{
        onScroll: Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        ),
        scrollEventThrottle: 16,
      }}
    >
      <View style={styles.screen}>
        <Animated.View style={[styles.hero, heroAnimatedStyle]}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroKicker}>Профиль ученика</Text>
            <Text style={styles.heroTitle}>Твой темп и прогресс</Text>
          </View>

          <View style={styles.heroPlaceholder}>
            {/* PLACEHOLDER: здесь хочется видеть кубок/маскота/achievement-иконку */}
            <Text style={styles.heroPlaceholderText}>REWARD</Text>
          </View>
        </Animated.View>

        <UserInfo />

        <UserStatistic />

        {/* <Button classes={{ btn: styles.logout, textBtn: styles.logoutText }}>
          редактировать
        </Button> */}

        {!!Object.keys(items)?.length && (
          <Button
            classes={{ btn: styles.repeatBtn, textBtn: styles.repeatText }}
            onPress={startRepeat}
          >
            {t('profileScreen.start_repeating')}
          </Button>
        )}

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

      <ModalCardsFilter visible={modalCards} setVisible={setModalCards} />
    </Layout>
  )
}

export default ProfileScreen
