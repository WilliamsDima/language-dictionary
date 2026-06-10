import Layout from '@/shared/UI/Layout/Layout'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Animated, Easing, Image, View } from 'react-native'
import ButtonGoogle from './UI/ButtonGoogle/ButtonGoogle'
import { styles } from './AuthScreen.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useTranslation } from '@/shared/i18n/types'
import Select from '@/shared/UI/Select/Select'
import { useActions } from '@/shared/hooks/useActions'
import type { AppLanguageType } from '@/shared/store/slice/appSlice'
import { changeLanguage } from '@/shared/i18n'
import CountryFlag from 'react-native-country-flag'

const AuthScreen: FC = () => {
  const { setAppLanguage } = useActions()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)

  const { aplication, appLanguage } = useAppSelector((store) => store.app)
  const floatAnim = useRef(new Animated.Value(0)).current

  const languages = useMemo(() => {
    return aplication?.appLanguages
      ? Object.values(aplication?.appLanguages)
          .sort((a, b) => a.id - b.id)
          .map((it) => {
            return {
              ...it,
              icon: (
                <View style={styles.icon}>
                  <CountryFlag
                    isoCode={it.emoji.toLocaleLowerCase()}
                    size={20}
                  />
                </View>
              ),
            }
          })
      : []
  }, [aplication])

  const onSelectLanguage = useCallback(
    async (lang: AppLanguageType) => {
      if (aplication) {
        setLoading(true)

        const path = aplication.translations[lang.code]

        await changeLanguage(lang.code, path)
        setAppLanguage(lang)
        setLoading(false)
      }
    },
    [aplication]
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
                Вход пока минимальный, но сам опыт изучения уже собираем как живую и игровую систему.
              </Text>
            </View>

            <Animated.View
              style={[styles.heroVisual, { transform: [{ translateY: heroTranslate }] }]}
            >
              <Image
                source={require('../../assets/images/languages.png')}
                style={styles.heroImage}
              />
            </Animated.View>
          </View>

          <View style={styles.placeholderCard}>
            {/* PLACEHOLDER: здесь хочется видеть большую бренд-иллюстрацию/персонажа на стартовом экране */}
            <Text style={styles.placeholderText}>HERO ART</Text>
          </View>
        </View>

        <View style={styles.controlsCard}>
          <Text style={styles.controlsTitle}>
            Подготовим обучение под твой язык
          </Text>

          <View style={styles.lang}>
            <View style={styles.langIcon}>
              {appLanguage ? (
                <View style={styles.iconSelect}>
                  <CountryFlag
                    isoCode={appLanguage.emoji.toLocaleLowerCase()}
                    size={40}
                  />
                </View>
              ) : (
                <Text>🌍</Text>
              )}
            </View>
            <Select
              classes={{ wrapper: styles.wrapperSelect }}
              options={languages}
              labelField="nativeName"
              valueField="code"
              iconField="icon"
              onSelect={onSelectLanguage}
              select={appLanguage}
              loading={loading}
              maxHeight={200}
            />
          </View>

          <ButtonGoogle />
        </View>
      </View>
    </Layout>
  )
}

export default AuthScreen
