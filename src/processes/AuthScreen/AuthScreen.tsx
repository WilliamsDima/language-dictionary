import Layout from '@/shared/UI/Layout/Layout'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { Image, View } from 'react-native'
import ButtonGoogle from './UI/ButtonGoogle/ButtonGoogle'
import { styles } from './AuthScreen.styles'
import Text from '@/shared/UI/Text/Text'
import ButtonVk from './UI/ButtonVk/ButtonVk'
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

  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.content}>
          <Image source={require('../../assets/images/languages.png')} />

          <Text style={styles.title}>{t('auth.title')}</Text>
        </View>

        <View style={styles.btns}>
          <View style={styles.lang}>
            <Text style={styles.langIcon}>
              {appLanguage ? (
                <View style={styles.iconSelect}>
                  <CountryFlag
                    isoCode={appLanguage.emoji.toLocaleLowerCase()}
                    size={40}
                  />
                </View>
              ) : (
                '🌍'
              )}
            </Text>
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

          {!!aplication?.showVKAuth && <ButtonVk />}
        </View>
      </View>
    </Layout>
  )
}

export default AuthScreen
