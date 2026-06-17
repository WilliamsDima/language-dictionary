import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './AboutBlock.styles'
import { useTranslation } from '@/shared/i18n/types'

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

const AboutBlock: FC = () => {
  const { t } = useTranslation()
  const { aplication } = useAppSelector((store) => store.app)

  return aplication ? (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.blockName}>
          <AboutTitle isAppName>
            {t('settingsScreen.about.1.blockName')}
          </AboutTitle>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.blockName}>
          <Text style={[styles.title]}>
            {t('settingsScreen.about.2.blockName')}
          </Text>
        </View>

        <View style={styles.textBlock}>
          {t('settingsScreen.about.2.text')
            .split(' ')
            .map((t, i) => {
              const isAppName = aplication.appName === t

              return (
                <AboutWord key={i} isAppName={isAppName}>
                  {t}{' '}
                </AboutWord>
              )
            })}
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.blockName}>
          <Text style={[styles.title]}>
            {t('settingsScreen.about.3.blockName')}
          </Text>
        </View>

        <View style={styles.punktsBlock}>
          <Text style={styles.punkt}>
            {t('settingsScreen.about.3.punkts.1')}
          </Text>
          <Text style={styles.punkt}>
            {t('settingsScreen.about.3.punkts.2')}
          </Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.textBlock}>
          {t('settingsScreen.about.4.text')
            .split(' ')
            .map((t, i) => {
              const isAppName = aplication.appName === t

              return (
                <AboutWord key={i} isAppName={isAppName}>
                  {t}{' '}
                </AboutWord>
              )
            })}
        </View>
      </View>
    </View>
  ) : (
    <></>
  )
}

export default AboutBlock
