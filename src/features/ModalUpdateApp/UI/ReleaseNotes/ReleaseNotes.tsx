import React, { FC, memo } from 'react'
import { ScrollView, View } from 'react-native'
import { styles } from './ReleaseNotes.styles'
import Text from '@/shared/UI/Text/Text'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  items: string[]
}

// «Что нового» в модалке обновления: пункты из release-notes/<versionName>.json,
// уже выбранные на языке интерфейса (getReleaseNotesItems).
// Обычный ScrollView, а не BottomSheetScrollView: последний перезаписывает
// измеренную высоту контента шторки (enableDynamicSizing) высотой своего
// списка, и шапка с кнопками перестают помещаться. Конфликта со свайпом
// шторки нет — ModalUpdateApp отключает перетаскивание за контент
const ReleaseNotes: FC<Props> = ({ items }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t('modal.modalUpdateApp.whats_new')}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.list}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <View key={`${index}-${item}`} style={styles.item}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.text}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default memo(ReleaseNotes)
