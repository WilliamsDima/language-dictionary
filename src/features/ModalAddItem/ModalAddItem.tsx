import React, { FC, memo, useState } from 'react'
import { styles } from './ModalAddItem.styles'
import { View, Animated, TouchableOpacity, ScrollView } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import DropShadow from 'react-native-drop-shadow'
import Text from '@/shared/UI/Text/Text'
import { useActions } from '@/shared/hooks/useActions'
import { useAppSelector } from '@/shared/hooks/useStore'
import Input from '@/shared/UI/Input/Input'
import ReadyIcon from '@/assets/icons/UI/ready-green-64.svg'
import CloseIcon from '@/assets/icons/UI/close-red-64.svg'
import LanguagesSelect from '@/widgets/LanguagesSelect/LanguagesSelect'
import { ILanguage } from '@/shared/json/languages'

type Props = {}

/**
 * модалка добавления слов
 *
 * @format
 */

const ModalAddItem: FC<Props> = () => {
  const { setShowAddModal } = useActions()

  const { showAddModal } = useAppSelector((store) => store.user)

  const [language, setLanguage] = useState<undefined | ILanguage>()

  const { getAnimationStyles } = useScaleAnim({
    active: showAddModal,
  })

  const onCancelHandler = () => {
    setShowAddModal(false)
  }

  const onSelectLanguage = (lang: ILanguage) => {
    setLanguage(lang)
  }

  return (
    <Modal
      visible={showAddModal}
      transparent
      statusBarTranslucent
      onRequestClose={onCancelHandler}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={onCancelHandler}
      >
        <Animated.View style={[getAnimationStyles(), styles.wrapperContainer]}>
          <DropShadow
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.15,
              shadowRadius: 5,
            }}
          >
            <TouchableOpacity style={styles.container} activeOpacity={1}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scroll}
              >
                <Text style={styles.title}>Создание группы слов</Text>
                <View style={styles.inputs}>
                  <Input
                    title="Слово для перевода"
                    placeholder="введите слово"
                    multiline
                    classes={{ input: styles.input }}
                  />

                  <Input
                    title="Перевод"
                    placeholder="введите перевод для слова"
                    multiline
                    classes={{ input: styles.input }}
                  />
                </View>

                <View style={styles.footer}>
                  <Input
                    title="Описание (не обязательно)"
                    placeholder="введите описание если требуется"
                    multiline
                    classes={{ input: styles.input }}
                  />

                  <LanguagesSelect
                    classes={{ select: styles.selectLang }}
                    onSelect={onSelectLanguage}
                    language={language}
                  />
                </View>
              </ScrollView>

              <View style={styles.btns}>
                <TouchableOpacity onPress={onCancelHandler}>
                  <CloseIcon width={34} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ReadyIcon width={34} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </DropShadow>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalAddItem)
