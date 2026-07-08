import React, { FC, memo, useMemo } from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ModalItemWords.styles'
import { TouchableOpacity, View } from 'react-native'
import Input from '@/shared/UI/Input/Input'
import { AddItemWords } from '../../Model/items'
import Text from '@/shared/UI/Text/Text'
import TrashIcon from '@/assets/icons/UI/trash-red-64.svg'
import { useTranslation } from '@/shared/i18n/types'

type Props = {
  item: AddItemWords
  index: number
  errorItems: boolean
  setItems: React.Dispatch<React.SetStateAction<AddItemWords[]>>
  setErrorItems: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalItemWords: FC<Props> = ({ item, index, errorItems, setItems }) => {
  const { t } = useTranslation()
  const { theme } = useUnistyles()

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

  const deleteItem = () => {
    setItems((prev) => {
      return prev.filter((it) => it.id !== item.id)
    })
  }

  const onChangeWord = (value: string) => {
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
  }

  const onChangeTranslate = (value: string) => {
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
  }

  return (
    <View style={[styles.inputs]}>
      <Text style={styles.index}>{index + 1}.</Text>
      <Input
        title={t('modal.modalAddItem.word_for_translate')}
        placeholder={t('modal.modalAddItem.word_for_translate_placeholder')}
        multiline
        value={item.word}
        onChangeText={onChangeWord}
        classes={{
          input: wordInputStyles,
        }}
      />

      <Input
        title={t('modal.modalAddItem.translate')}
        placeholder={t('modal.modalAddItem.translate_placeholder')}
        multiline
        value={item.translate}
        onChangeText={onChangeTranslate}
        classes={{
          input: translateInputStyles,
        }}
      />

      {index > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.deleteBtn} onPress={deleteItem}>
            <TrashIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default memo(ModalItemWords)
