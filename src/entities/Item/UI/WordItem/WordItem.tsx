import React, { FC, memo, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './WordItem.styles'
import Text from '@/shared/UI/Text/Text'
import { useGetUserProfileQuery } from '@/pages/SettingsScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import { AddItemWords } from '@/features/ModalAddItem/Model/items'
import SoundBIcon from '@/assets/icons/UI/sound-primery-64.svg'
import { textToSpeech } from '@/shared/helpers/textToSpeech'
import { IItem } from '../../model/item'

type Props = {
  item: AddItemWords
  parentItem: IItem
  translateActive: boolean
  index: number
  isLast: boolean
}

const WordItem: FC<Props> = ({
  item,
  index,
  translateActive,
  parentItem,
  isLast,
}) => {
  const { firebaseData } = useAppSelector((store) => store.user)
  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)

  const viewTypeItem = useMemo(() => {
    return profile?.showVariantList
  }, [profile])

  const sound = () => {
    textToSpeech({ lang: parentItem.language.short_name, text: item.word })
  }

  return (
    <View style={[styles.item, isLast && styles.itemLast]}>
      <Text style={styles.index}>{index + 1}.</Text>

      {(viewTypeItem?.value === 'word_only' ||
        translateActive ||
        viewTypeItem?.value === 'word_and_translate') && (
        <View style={styles.wordItem}>
          <Text style={styles.word}>{item.word}</Text>
          <TouchableOpacity onPress={sound}>
            <SoundBIcon width={15} height={15} />
          </TouchableOpacity>
        </View>
      )}

      {(viewTypeItem?.value === 'translate_only' ||
        translateActive ||
        viewTypeItem?.value === 'word_and_translate') && (
        <View style={styles.wordItem}>
          <Text style={styles.word}>{item.translate}</Text>
        </View>
      )}
    </View>
  )
}

export default memo(WordItem)
