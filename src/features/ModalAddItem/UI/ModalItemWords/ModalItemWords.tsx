import React, { FC, memo, useMemo } from 'react'
import { styles } from './ModalItemWords.styles'
import { TouchableOpacity, View } from 'react-native'
import Input from '@/shared/UI/Input/Input'
import { AddItemWords } from '../../Model/items'
import Text from '@/shared/UI/Text/Text'
import TrashIcon from '@/assets/icons/UI/trash-red-64.svg'
import { COLORS } from '@/assets/styles/colors'

type Props = {
  item: AddItemWords
  index: number
  errorItems: boolean
  setItems: React.Dispatch<React.SetStateAction<AddItemWords[]>>
  setErrorItems: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalItemWords: FC<Props> = ({
  item,
  index,
  errorItems,
  setItems,
  setErrorItems,
}) => {
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

  const deleteItem = () => {
    setItems((prev) => {
      return prev.filter((it) => it.id !== item.id)
    })
  }

  const onChangeWord = (t: string) => {
    setItems((prev) => {
      return prev.map((it) => {
        if (it.id === item.id) {
          return {
            ...it,
            word: t,
          }
        }
        return it
      })
    })
  }

  const onChangeTranslate = (t: string) => {
    setItems((prev) => {
      return prev.map((it) => {
        if (it.id === item.id) {
          return {
            ...it,
            translate: t,
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
        title="Слово для перевода"
        placeholder="введите слово"
        multiline
        value={item.word}
        onChangeText={onChangeWord}
        classes={{
          input: [
            styles.input,
            isErrorWord ? { borderColor: COLORS.red, borderWidth: 1 } : {},
          ],
        }}
      />

      <Input
        title="Перевод"
        placeholder="введите перевод для слова"
        multiline
        value={item.translate}
        onChangeText={onChangeTranslate}
        classes={{
          input: [
            styles.input,
            isErrorTranslate ? { borderColor: COLORS.red, borderWidth: 1 } : {},
          ],
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
