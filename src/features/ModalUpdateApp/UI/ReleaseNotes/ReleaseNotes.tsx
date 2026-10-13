import React, { FC, memo } from 'react'
import { View } from 'react-native'
import { styles } from './ReleaseNotes.styles'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  items: string[]
}

// «Что нового» в модалке обновления: пункты из release-notes/<versionName>.json,
// уже выбранные на языке интерфейса (getReleaseNotesItems)
const ReleaseNotes: FC<Props> = ({ items }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('modal.modalUpdateApp.whats_new')}</Text>

      {items.map((item, index) => (
        <View key={`${index}-${item}`} style={styles.item}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  )
}

export default memo(ReleaseNotes)
