import React, { type FC, memo } from 'react'
import { styles } from './YearResultLanguagesSlide.styles'
import { View } from 'react-native'
import Text from '@/shared/UI/Text/Text'
import LottieView from 'lottie-react-native'
import { AnimatedCounter } from '@/shared/UI/AnimatedCounter/AnimatedCounter'
import type { YearStatsLanguage } from '@/shared/API/services/metrics/types'

type Props = {
  title: string
  description: string
  languages: YearStatsLanguage[]
  isActive: boolean
}

// "топ языков" — вместо графика показываем количество изучаемых языков и
// список чипов с их названиями
const YearResultLanguagesSlide: FC<Props> = ({
  title,
  description,
  languages,
  isActive,
}) => {
  return (
    <View style={styles.slide}>
      <View style={styles.titles}>
        {title ? <Text style={styles.title}>{title}</Text> : <></>}

        <AnimatedCounter start={isActive} value={languages.length} />

        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.chips}>
        {languages.map((language) => (
          <View key={language.code} style={styles.chip}>
            <Text style={styles.chipText}>{language.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <LottieView
          style={styles.lottie}
          source={require('../../../../shared/json/brain.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  )
}

export default memo(YearResultLanguagesSlide)
