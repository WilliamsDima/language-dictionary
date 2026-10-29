import React, { FC, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import Layout from '@/shared/UI/Layout/Layout'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'
import { useTranslation } from '@/shared/i18n/types'
import { useGetItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import type { GetItemsParams } from '@/pages/MainScreen/api/types'
import ModalCardsFilter from '@/features/ModalCardsFilter/ModalCardsFilter'
import {
  PRACTICE_MODES,
  PracticeModeId,
} from '@/entities/PracticeMode/model/practiceMode'
import PracticeModeItem from './UI/PracticeModeItem/PracticeModeItem'
import { styles } from './PracticeScreen.styles'

// только total всех карточек пользователя — те же аргументы, что у счётчика
// в таб-баре, поэтому запрос делит с ним кэш
const CARDS_COUNT_ARGS: GetItemsParams = {
  filter: { status: 'ALL' },
  limitCount: 1,
  page: 1,
}

// вкладка «Практика»: список режимов; выбор доступного режима открывает
// настройку набора карточек (ModalCardsFilter), «Начать» — сессию режима
const PracticeScreen: FC = () => {
  const { isAuth } = useAppSelector((store) => store.app)

  const [selectedModeId, setSelectedModeId] =
    useState<PracticeModeId>('flashcards')

  const { data } = useGetItemsQuery(CARDS_COUNT_ARGS, { skip: !isAuth })

  const [sheetRef, presentSheet, onDismissSheet] = useBottomSheet()
  const { t } = useTranslation()

  const cardsCount = useMemo(() => data?.total ?? 0, [data?.total])

  const onSelectMode = useCallback(
    (modeId: PracticeModeId) => {
      setSelectedModeId(modeId)
      presentSheet()
    },
    [presentSheet]
  )

  return (
    <Layout isScroll>
      <View style={styles.screen}>
        <Text style={styles.subtitle}>{t('practiceScreen.subtitle')}</Text>

        {PRACTICE_MODES.map((mode) => (
          <PracticeModeItem
            key={mode.id}
            mode={mode}
            cardsCount={cardsCount}
            onPress={onSelectMode}
          />
        ))}
      </View>

      <ModalCardsFilter
        sheetRef={sheetRef}
        onDismiss={onDismissSheet}
        modeId={selectedModeId}
      />
    </Layout>
  )
}

export default PracticeScreen
