import React, { FC, RefObject, memo, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { STREAK_FREEZE_PERIOD } from '@/shared/helpers/streakFreeze'
import { useTranslation } from '@/shared/i18n/types'
import { styles } from './ModalStreakFreezeInfo.styles'

type Props = {
  sheetRef: RefObject<BottomSheetModal | null>
  onDismiss?: () => void
  available: number
  max: number
  // день серии со следующей заморозкой; null — заморозок уже максимум
  nextFreezeAt: number | null
}

type Rule = {
  id: string
  icon: string
  text: string
}

const BTN_CLASSES = { textBtn: styles.textBtn }

// шторка с объяснением, что такое заморозка серии и как она работает;
// открывается тапом по счётчику ❄️ N/3 на плитке серии в профиле
const ModalStreakFreezeInfo: FC<Props> = ({
  sheetRef,
  onDismiss,
  available,
  max,
  nextFreezeAt,
}) => {
  const { t } = useTranslation()

  const title = useMemo(() => t('modal.modalStreakFreezeInfo.title'), [t])
  const subtitle = useMemo(
    () => t('modal.modalStreakFreezeInfo.subtitle'),
    [t]
  )

  const counterText = useMemo(
    () => `❄️ ${available}/${max}`,
    [available, max]
  )

  const hintText = useMemo(
    () =>
      nextFreezeAt === null
        ? t('modal.modalStreakFreezeInfo.max')
        : t('modal.modalStreakFreezeInfo.next', { value: nextFreezeAt }),
    [t, nextFreezeAt]
  )

  const rules = useMemo<Rule[]>(
    () => [
      {
        id: 'cover',
        icon: '🧊',
        text: t('modal.modalStreakFreezeInfo.rule_cover'),
      },
      {
        id: 'pause',
        icon: '⏸️',
        text: t('modal.modalStreakFreezeInfo.rule_pause'),
      },
      {
        id: 'earn',
        icon: '🎁',
        text: t('modal.modalStreakFreezeInfo.rule_earn', {
          period: STREAK_FREEZE_PERIOD,
        }),
      },
      {
        id: 'max',
        icon: '📦',
        text: t('modal.modalStreakFreezeInfo.rule_max', { max }),
      },
      {
        id: 'break',
        icon: '⚠️',
        text: t('modal.modalStreakFreezeInfo.rule_break'),
      },
    ],
    [t, max]
  )

  const onClose = useCallback(() => {
    sheetRef.current?.dismiss()
  }, [sheetRef])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onDismiss}
      title={title}
      subtitle={subtitle}
      variant="view"
      dynamicSizing
    >
      <View style={styles.status}>
        <Text style={styles.statusValue}>{counterText}</Text>
        <Text style={styles.statusCaption}>
          {t('modal.modalStreakFreezeInfo.available')}
        </Text>
        <Text style={styles.statusHint}>{hintText}</Text>
      </View>

      <View style={styles.rules}>
        {rules.map((rule) => (
          <View key={rule.id} style={styles.rule}>
            <Text style={styles.ruleIcon}>{rule.icon}</Text>
            <Text style={styles.ruleText}>{rule.text}</Text>
          </View>
        ))}
      </View>

      <Button style={styles.btn} classes={BTN_CLASSES} onPress={onClose}>
        {t('modal.modalStreakFreezeInfo.ok')}
      </Button>
    </BottomSheet>
  )
}

export default memo(ModalStreakFreezeInfo)
