import Layout from '@/shared/UI/Layout/Layout'
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ActivityIndicator,
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  View,
} from 'react-native'
import ButtonGoogle from './UI/ButtonGoogle/ButtonGoogle'
import { styles } from './AuthScreen.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import { useActions } from '@/shared/hooks/useActions'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'
import { changeLanguage } from '@/shared/i18n'
import CountryFlag from 'react-native-country-flag'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import ArrowDownIcon from '@/assets/icons/UI/arrow-down-green-64.svg'

type AuthLanguageRowProps = {
  item: AppLanguageType
  isActive: boolean
  isLoading: boolean
  onSelect: (lang: AppLanguageType) => void
}

const AuthLanguageRow = memo(
  ({ item, isActive, isLoading, onSelect }: AuthLanguageRowProps) => {
    const rowStyles = useMemo(() => {
      return [styles.sheetItem, isActive ? styles.sheetItemActive : null]
    }, [isActive])

    const nameStyles = useMemo(() => {
      return [
        styles.sheetItemName,
        isActive ? styles.sheetItemNameActive : null,
      ]
    }, [isActive])

    const onPress = useCallback(() => {
      onSelect(item)
    }, [item, onSelect])

    return (
      <TouchableOpacity
        style={rowStyles}
        onPress={onPress}
        disabled={isLoading}
      >
        <View style={styles.sheetItemFlag}>
          <CountryFlag isoCode={item.emoji.toLocaleLowerCase()} size={28} />
        </View>

        <View style={styles.sheetItemCopy}>
          <Text style={nameStyles}>{item.nativeName}</Text>
          <Text style={styles.sheetItemHint}>{item.ruName}</Text>
        </View>

        <View style={styles.sheetItemMeta}>
          <Text style={styles.sheetItemCode}>{item.code.toUpperCase()}</Text>

          {isActive && isLoading ? (
            <ActivityIndicator size="small" style={styles.sheetItemLoader} />
          ) : null}
        </View>
      </TouchableOpacity>
    )
  }
)

const AuthScreen: FC = () => {
  const { setAppLanguage } = useActions()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const { aplication, appLanguage } = useAppSelector((store) => store.app)
  const floatAnim = useRef(new Animated.Value(0)).current
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()

  const languages = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages).sort((a, b) => a.id - b.id)
      : []
  }, [aplication])

  const onSelectLanguage = useCallback(
    async (lang: AppLanguageType) => {
      if (!aplication || lang.code === appLanguage?.code) {
        dismissSheet()
        return
      }

      dismissSheet()
      setLoading(true)

      try {
        const path = aplication.translations[lang.code]

        await changeLanguage(lang.code, path)
        setAppLanguage(lang)
      } finally {
        setLoading(false)
      }
    },
    [appLanguage?.code, aplication, dismissSheet, setAppLanguage]
  )

  const openLanguagesSheet = useCallback(() => {
    if (loading) {
      return
    }

    presentSheet()
  }, [loading, presentSheet])

  const selectedFlag = useMemo(() => {
    if (!appLanguage) {
      return <Text style={styles.selectorFallback}>🌍</Text>
    }

    return (
      <View style={styles.iconSelect}>
        <CountryFlag
          isoCode={appLanguage.emoji.toLocaleLowerCase()}
          size={40}
        />
      </View>
    )
  }, [appLanguage])

  const selectorDescription = useMemo(() => {
    if (!appLanguage) {
      return 'Выбери язык интерфейса'
    }

    return appLanguage.ruName
  }, [appLanguage])

  const selectorTitle = useMemo(() => {
    if (!appLanguage) {
      return 'Язык не выбран'
    }

    return appLanguage.nativeName
  }, [appLanguage])

  const renderLanguageRow = useCallback(
    (item: AppLanguageType) => {
      const isActive = item.code === appLanguage?.code

      return (
        <AuthLanguageRow
          key={item.code}
          item={item}
          isActive={isActive}
          isLoading={loading}
          onSelect={onSelectLanguage}
        />
      )
    },
    [appLanguage?.code, loading, onSelectLanguage]
  )

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [floatAnim])

  const heroTranslate = useMemo(() => {
    return floatAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -12],
    })
  }, [floatAnim])

  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.heroCard}>
            <View style={styles.heroCopy}>
              <Text style={styles.badge}>Language streak</Text>
              <Text style={styles.title}>{t('auth.title')}</Text>
              <Text style={styles.subtitle}>
                Вход пока минимальный, но сам опыт изучения уже собираем как
                живую и игровую систему.
              </Text>
            </View>

            <Animated.View
              style={[
                styles.heroVisual,
                { transform: [{ translateY: heroTranslate }] },
              ]}
            >
              <Image
                source={require('../../assets/images/languages.png')}
                style={styles.heroImage}
              />
            </Animated.View>
          </View>

          <View style={styles.placeholderCard}>
            <Image
              source={require('../../assets/images/maskot.png')}
              style={styles.mascotImage}
            />
          </View>
        </View>

        <View style={styles.controlsCard}>
          <Text style={styles.controlsTitle}>
            Подготовим обучение под твой язык
          </Text>

          <TouchableOpacity
            style={styles.selector}
            onPress={openLanguagesSheet}
            disabled={loading}
          >
            <View style={styles.selectorFlag}>{selectedFlag}</View>

            <View style={styles.selectorCopy}>
              <Text style={styles.selectorLabel}>Язык интерфейса</Text>
              <Text style={styles.selectorValue}>{selectorTitle}</Text>
              <Text style={styles.selectorHint}>{selectorDescription}</Text>
            </View>

            <View style={styles.selectorAction}>
              {loading ? (
                <ActivityIndicator size="small" style={styles.selectorLoader} />
              ) : (
                <ArrowDownIcon width={20} height={20} />
              )}
            </View>
          </TouchableOpacity>

          <Text style={styles.selectorFootnote}>
            Можно поменять позже в настройках.
          </Text>

          <ButtonGoogle />
        </View>
      </View>

      <BottomSheet
        sheetRef={sheetRef}
        onDismiss={dismissSheet}
        title="Язык интерфейса"
        subtitle="Выбери язык, на котором приложение будет показывать карточки и подсказки"
        dynamicSizing={false}
        snapPoints={['68%']}
      >
        <View style={styles.sheetList}>{languages.map(renderLanguageRow)}</View>
      </BottomSheet>
    </Layout>
  )
}

export default AuthScreen
