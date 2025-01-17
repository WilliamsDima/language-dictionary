import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import React, { FC } from 'react'
import { View } from 'react-native'
import { styles } from './AboutBlock.styles'

const AboutBlock: FC = () => {
  const { aplication } = useAppSelector((store) => store.app)

  return (
    <View style={styles.container}>
      {aplication?.about.blocks.map((it) => {
        const blockName = it.blockName?.split(' ')
        const text = it.text?.split(' ')

        return (
          <View key={it.id} style={styles.item}>
            {!!blockName?.length && (
              <View style={styles.blockName}>
                {blockName.map((bm, i) => {
                  const isAppName = aplication.appName === bm

                  return (
                    <Text
                      key={i}
                      style={[styles.title, isAppName && styles.appName]}
                    >
                      {bm}{' '}
                    </Text>
                  )
                })}
              </View>
            )}

            {!!text?.length && (
              <View style={styles.textBlock}>
                {text.map((t, i) => {
                  const isAppName = aplication.appName === t

                  return (
                    <Text
                      key={i}
                      style={[styles.text, isAppName && styles.appName]}
                    >
                      {t}{' '}
                    </Text>
                  )
                })}
              </View>
            )}

            {!!it.punkts && (
              <View style={styles.punktsBlock}>
                {it.punkts.map((p, index) => {
                  const text = p?.split(' ')

                  return (
                    <Text key={index} style={styles.punkt}>
                      {index + 1}.{' '}
                      {text.map((t, i) => {
                        const isAppName = aplication.appName === t

                        return (
                          <Text
                            key={i}
                            style={[styles.punkt, isAppName && styles.appName]}
                          >
                            {t}{' '}
                          </Text>
                        )
                      })}
                    </Text>
                  )
                })}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

export default AboutBlock
