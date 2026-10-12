import React, { FC, memo, useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styles } from './WordItem.styles'
import Text from '@/shared/UI/Text/Text'
import { useAppSelector } from '@/shared/hooks/useStore'
import { AddItemWords } from '@/features/ModalAddItem/Model/items'
import SoundBIcon from '@/assets/icons/UI/sound-primery-64.svg'
import { textToSpeech } from '@/shared/helpers/textToSpeech'
import { toast } from '@/shared/UI/Toast/toast'
import { useTranslation } from '@/shared/i18n/types'
import { DEFAULT_SHOW_VARIANT } from '@/shared/constants/showVariants'
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
  const showVariantList = useAppSelector((store) => store.user.showVariantList)

  const { t } = useTranslation()

  const viewTypeItem = useMemo(() => {
    return showVariantList ?? DEFAULT_SHOW_VARIANT
  }, [showVariantList])

  const sound = useCallback(async () => {
    const result = await textToSpeech({
      lang: parentItem.language,
      text: item.word,
    })

    if (result === 'no_engine') {
      toast.error(t('tts.no_engine'))
    } else if (result === 'lang_unavailable') {
      toast.error(t('tts.lang_unavailable'))
    } else if (result === 'failed') {
      toast.error(t('tts.error'))
    }
  }, [item.word, parentItem.language, t])

  styles.useVariants({
    isLast,
  })

  return (
    <View style={styles.item}>
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
