import React, { FC, memo } from 'react'
import { styles } from './ModalAddItem.styles'
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import Text from '@/shared/UI/Text/Text'
import Input from '@/shared/UI/Input/Input'
import ReadyIcon from '@/assets/icons/UI/ready-green-64.svg'
import CloseIcon from '@/assets/icons/UI/close-red-64.svg'
import PlusIcon from '@/assets/icons/UI/plus-green-64.svg'
import LanguagesSelect from '@/widgets/LanguagesSelect/LanguagesSelect'
import ModalItemWords from './UI/ModalItemWords/ModalItemWords'
import { COLORS } from '@/assets/styles/colors'
import { useModalAddItem } from './useModalAddItem'

type Props = {}

/**
 * модалка добавления слов
 *
 * @format
 */

const ModalAddItem: FC<Props> = () => {
  const {
    addItem,
    description,
    getAnimationStyles,
    isLoading,
    language,
    onConfirm,
    onSelectLanguage,
    setDescription,
    showAddModal,
    onCancelHandler,
    scrollref,
    isOpen,
    setItems,
    items,
    errorLanguage,
    setErrorItems,
    errorItems,
  } = useModalAddItem()

  return (
    <Modal
      visible={showAddModal}
      transparent
      onRequestClose={onCancelHandler}
      animationType="fade"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.wrapper]}>
          <Animated.View
            style={[getAnimationStyles(), styles.wrapperContainer]}
          >
            <TouchableOpacity style={styles.container} activeOpacity={1}>
              <ScrollView
                ref={scrollref}
                showsVerticalScrollIndicator={false}
                style={styles.scroll}
                contentContainerStyle={{
                  paddingBottom: isOpen ? 150 : 0,
                }}
              >
                <Text style={styles.title}>Создание карточки</Text>

                {items.map((it, i) => {
                  return (
                    <ModalItemWords
                      setErrorItems={setErrorItems}
                      setItems={setItems}
                      errorItems={errorItems}
                      index={i}
                      key={it.id}
                      item={it}
                    />
                  )
                })}

                <View style={styles.btnWrapper}>
                  <TouchableOpacity style={styles.btnAddItem} onPress={addItem}>
                    <PlusIcon width={30} height={30} />
                  </TouchableOpacity>
                </View>

                <View style={[styles.footer]}>
                  <Input
                    title="Описание (не обязательно)"
                    placeholder="введите описание если требуется"
                    multiline
                    value={description}
                    onChangeText={setDescription}
                    classes={{ input: styles.input }}
                  />

                  <LanguagesSelect
                    classes={{ select: styles.selectLang }}
                    onSelect={onSelectLanguage}
                    language={language}
                    error={errorLanguage}
                  />
                </View>
              </ScrollView>

              <View
                style={[
                  styles.btns,
                  isLoading
                    ? {
                        justifyContent: 'center',
                      }
                    : {},
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator size={'large'} color={COLORS.primery} />
                ) : (
                  <>
                    <TouchableOpacity onPress={onCancelHandler}>
                      <CloseIcon width={30} height={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm}>
                      <ReadyIcon width={30} height={30} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default memo(ModalAddItem)
