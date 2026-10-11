import Text from '@/shared/UI/Text/Text'
import React, { FC, memo, useMemo } from 'react'
import { View } from 'react-native'
import { styles } from './AboutBlockItem.styles'
import { type I18NKeys, useTranslation } from '@/shared/i18n/types'

type AboutWordProps = {
  children: React.ReactNode
  isAppName: boolean
}

const AboutTitle: FC<AboutWordProps> = ({ children, isAppName }) => {
  styles.useVariants({
    isAppName,
  })

  return <Text style={styles.title}>{children}</Text>
}

const AboutWord: FC<AboutWordProps> = ({ children, isAppName }) => {
  styles.useVariants({
    isAppName,
  })

  return <Text style={styles.text}>{children}</Text>
}

type Props = {
  // blockName/text/punkts — ключи перевода из app config (about.blocks)
  blockName?: string
  text?: string
  punkts?: string[]
  appName: string
}

const AboutBlockItem: FC<Props> = ({ blockName, text, punkts, appName }) => {
  const { t } = useTranslation()

  const title = useMemo(() => {
    return blockName ? t(blockName as I18NKeys) : ''
  }, [blockName, t])

  const isTitleAppName = useMemo(
    () => !!title && title === appName,
    [title, appName]
  )

  // название приложения внутри текста подсвечивается отдельным цветом
  const words = useMemo(() => {
    if (!text) {
      return []
    }

    return t(text as I18NKeys)
      .split(' ')
      .map((word) => ({ word, isAppName: word === appName }))
  }, [text, t, appName])

  const punktsText = useMemo(() => {
    return (punkts ?? [])
      .filter((punkt) => !!punkt)
      .map((punkt) => t(punkt as I18NKeys))
  }, [punkts, t])

  const isEmpty = useMemo(
    () => !title && !words.length && !punktsText.length,
    [title, words, punktsText]
  )

  return isEmpty ? (
    <></>
  ) : (
    <View style={styles.item}>
      {title ? (
        <View style={styles.blockName}>
          <AboutTitle isAppName={isTitleAppName}>{title}</AboutTitle>
        </View>
      ) : (
        <></>
      )}

      {words.length ? (
        <View style={styles.textBlock}>
          {words.map((it, i) => {
            return (
              <AboutWord key={i} isAppName={it.isAppName}>
                {it.word}{' '}
              </AboutWord>
            )
          })}
        </View>
      ) : (
        <></>
      )}

      {punktsText.length ? (
        <View style={styles.punktsBlock}>
          {punktsText.map((punkt, i) => {
            return (
              <Text key={i} style={styles.punkt}>
                {punkt}
              </Text>
            )
          })}
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

export default memo(AboutBlockItem)
