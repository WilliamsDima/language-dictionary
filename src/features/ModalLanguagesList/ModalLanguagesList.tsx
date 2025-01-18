import React, { FC, memo, useState } from 'react'
import { styles } from './ModalLanguagesList.styles'
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { ILanguage, languages } from '@/shared/json/languages'

type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
  onSelect?: (visible: ILanguage) => void
  language?: ILanguage
}

/**
 * модалка выбора языка
 *
 * @format
 */

const ModalLanguagesList: FC<Props> = ({
  visible,
  setVisible,
  onSelect,
  language,
}) => {
  const { getAnimationStyles } = useScaleAnim({
    active: visible,
  })

  const [isonsError, setIsonsError] = useState<number[]>([])

  const onCancelHandler = () => {
    setVisible(false)
  }

  return (
    <Modal
      visible={visible}
      transparent
      onRequestClose={onCancelHandler}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onCancelHandler}
      >
        <Animated.View style={[getAnimationStyles(), styles.wrapperContainer]}>
          <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.title}>Выбор языка:</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}
            >
              <View style={styles.list}>
                {languages.map((it, i) => {
                  const iconIsError = isonsError.includes(it.id)
                  return (
                    <TouchableOpacity
                      style={[
                        styles.item,
                        language?.id === it.id && styles.active,
                        i === languages.length - 1 && styles.isLast,
                      ]}
                      key={it.id}
                      onPress={() => {
                        onSelect && onSelect(it)
                      }}
                    >
                      <Text style={styles.name}>{it.full_name}</Text>

                      {!iconIsError && (
                        <Image
                          source={{ uri: it.country.flag }}
                          style={styles.icon}
                          onError={() => {
                            setIsonsError((prev) => [...prev, it.id])
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalLanguagesList)
