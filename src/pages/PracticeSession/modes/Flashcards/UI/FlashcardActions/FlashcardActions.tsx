import React, { FC, memo, useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useUnistyles } from 'react-native-unistyles'
import Button from '@/shared/UI/Button/Button'
import { useActions } from '@/shared/hooks/useActions'
import { useCards } from '@/shared/hooks/useCards'
import type { CardStatus, IItem } from '@/entities/Item/model/item'
import EditIcon from '@/assets/icons/UI/edit-green-64.svg'
import DoneIcon from '@/assets/icons/UI/done-primery-64.svg'
import RepeatIcon from '@/assets/icons/UI/repeat-64-orange.svg'
import { styles } from './FlashcardActions.styles'

type Props = {
  card: IItem
}

const ICON_SIZE = 24

// ручные действия с карточкой в режиме «Карточки»: отметить изученной /
// вернуть в изучение (PUT /cards/{id}/status, как раньше в свободной
// практике) и открыть редактирование (ModalAddItem на экране сессии)
const FlashcardActions: FC<Props> = ({ card }) => {
  const { setItemEdit, setShowAddModal } = useActions()

  // статус держим локально: после смены карточка может выпасть из кэша
  // списка под фильтр по статусу, и пропс card останется старым снимком
  const [status, setStatus] = useState<CardStatus>(card.status)
  const [isUpdating, setIsUpdating] = useState(false)

  const { updateStatusHandler } = useCards()
  const { theme } = useUnistyles()

  const nextStatus = useMemo<CardStatus>(
    () => (status === 'READY' ? 'STUDY' : 'READY'),
    [status]
  )

  const toggleStatus = useCallback(async () => {
    if (isUpdating) return

    const prevStatus = status

    setIsUpdating(true)
    setStatus(nextStatus)

    const isSaved = await updateStatusHandler(card, nextStatus)

    if (!isSaved) {
      setStatus(prevStatus)
    }

    setIsUpdating(false)
  }, [card, isUpdating, nextStatus, status, updateStatusHandler])

  const editCard = useCallback(() => {
    setItemEdit(card)
    setShowAddModal(true)
  }, [card, setItemEdit, setShowAddModal])

  return (
    <View style={styles.wrapper}>
      <Button
        isText={false}
        style={styles.btn}
        disabled={isUpdating}
        onPress={toggleStatus}
      >
        {isUpdating ? (
          <ActivityIndicator
            size={'small'}
            color={theme.colors.palette.primery}
          />
        ) : status === 'STUDY' ? (
          <DoneIcon width={ICON_SIZE} height={ICON_SIZE} />
        ) : (
          <RepeatIcon width={ICON_SIZE} height={ICON_SIZE} />
        )}
      </Button>

      <Button isText={false} style={styles.btn} onPress={editCard}>
        <EditIcon width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
    </View>
  )
}

export default memo(FlashcardActions)
