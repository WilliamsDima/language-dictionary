import React, { FC, memo, useCallback, useMemo } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ModalItemWords.styles'
import { TouchableOpacity, View } from 'react-native'
import Input from '@/shared/UI/Input/Input'
import { AddItemWords, SimilarHint } from '../../Model/items'
import Text from '@/shared/UI/Text/Text'
import TrashIcon from '@/assets/icons/UI/trash-red-64.svg'
import { useTranslation } from '@/shared/i18n/types'
import { IItem } from '@/entities/Item/model/item'
import SimilarItemsHint from '../SimilarItemsHint/SimilarItemsHint'

type Props = {
  item: AddItemWords
  index: number
  errorItems: boolean
  // поля заблокированы, пока не выбран язык
  isLocked: boolean
  // подсказка о похожих карточках — приходит только для активной строки
  similarHint: SimilarHint | null
  onSelectSimilar: (item: IItem) => void
  setItems: React.Dispatch<React.SetStateAction<AddItemWords[]>>
  setErrorItems: React.Dispatch<React.SetStateAction<boolean>>
  setActiveItemId: React.Dispatch<React.SetStateAction<number | null>>
}

const ModalItemWords: FC<Props> = ({
  item,
  index,
  errorItems,
  isLocked,
  similarHint,
  onSelectSimilar,
  setItems,
  setActiveItemId,
}) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

  styles.useVariants({
    locked: isLocked,
  })

  const isEditable = useMemo(() => !isLocked, [isLocked])

  const canDelete = useMemo(() => index > 0, [index])

  const isErrorWord = useMemo(() => {
    if (errorItems) {
      return !item.word.trim()
    }

    return false
  }, [errorItems, item])

  const isErrorTranslate = useMemo(() => {
    if (errorItems) {
      return !item.translate.trim()
    }

    return false
  }, [errorItems, item])

  const wordInputStyles = useMemo(() => {
    return [
      styles.input,
      ...(isErrorWord
        ? [
            {
              borderColor: theme.colors.palette.red,
              borderWidth: theme.size.s1,
            },
          ]
        : []),
    ]
  }, [isErrorWord, theme.colors.palette.red, theme.size.s1])

  const translateInputStyles = useMemo(() => {
    return [
      styles.input,
      ...(isErrorTranslate
        ? [
            {
              borderColor: theme.colors.palette.red,
              borderWidth: theme.size.s1,
            },
          ]
        : []),
    ]
  }, [isErrorTranslate, theme.colors.palette.red, theme.size.s1])

  const wordInputClasses = useMemo(
    () => ({ input: wordInputStyles }),
    [wordInputStyles]
  )

  const translateInputClasses = useMemo(
    () => ({ input: translateInputStyles }),
    [translateInputStyles]
  )

  const deleteItem = useCallback(() => {
    setItems((prev) => {
      return prev.filter((it) => it.id !== item.id)
    })
  }, [item.id, setItems])

  const onChangeWord = useCallback(
    (value: string) => {
      setActiveItemId(item.id)
      setItems((prev) => {
        return prev.map((it) => {
          if (it.id === item.id) {
            return {
              ...it,
              word: value,
            }
          }
          return it
        })
      })
    },
    [item.id, setActiveItemId, setItems]
  )

  const onChangeTranslate = useCallback(
    (value: string) => {
      setItems((prev) => {
        return prev.map((it) => {
          if (it.id === item.id) {
            return {
              ...it,
              translate: value,
            }
          }
          return it
        })
      })
    },
    [item.id, setItems]
  )

  return (
    <View style={styles.inputs}>
      <Text style={styles.index}>{index + 1}.</Text>
      <Input
        title={t('modal.modalAddItem.word_for_translate')}
        placeholder={t('modal.modalAddItem.word_for_translate_placeholder')}
        multiline
        editable={isEditable}
        value={item.word}
        onChangeText={onChangeWord}
        classes={wordInputClasses}
      />

      {similarHint ? (
        <SimilarItemsHint hint={similarHint} onSelect={onSelectSimilar} />
      ) : (
        <></>
      )}

      <Input
        title={t('modal.modalAddItem.translate')}
        placeholder={t('modal.modalAddItem.translate_placeholder')}
        multiline
        editable={isEditable}
        value={item.translate}
        onChangeText={onChangeTranslate}
        classes={translateInputClasses}
      />

      {canDelete ? (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.deleteBtn} onPress={deleteItem}>
            <TrashIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  )
}

export default memo(ModalItemWords)
