import React, {
  FC,
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './ModalAddItem.styles'
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'
import Input from '@/shared/UI/Input/Input'
import ReadyIcon from '@/assets/icons/UI/ready-green-64.svg'
import CloseIcon from '@/assets/icons/UI/close-red-64.svg'
import PlusIcon from '@/assets/icons/UI/plus-green-64.svg'
import LanguagesSelect from '@/widgets/LanguagesSelect/LanguagesSelect'
import ModalItemWords from './UI/ModalItemWords/ModalItemWords'
import { useModalAddItem } from './useModalAddItem'
import { useTranslation } from '@/shared/i18n/types'
import BottomSheet from '@/shared/UI/BottomSheet/BottomSheet'
import { useBottomSheet } from '@/shared/UI/BottomSheet/hooks/useBottomSheet'

type Props = {}

/**
 * модалка добавления слов
 *
 * @format
 */

const ModalAddItem: FC<Props> = () => {
  const { theme } = useUnistyles()
  const {
    addItem,
    description,
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

  const { t } = useTranslation()
  const [sheetRef, presentSheet, dismissSheet] = useBottomSheet()
  const wasVisibleRef = useRef(false)

  const scrollContentStyle = useMemo(
    () => ({ paddingBottom: isOpen ? 150 : 24 }),
    [isOpen]
  )

  const footerStyle = useMemo(
    () => [styles.btns, isLoading ? { justifyContent: 'center' as const } : {}],
    [isLoading]
  )

  const handleConfirm = useCallback(() => {
    startTransition(onConfirm)
  }, [onConfirm])

  useEffect(() => {
    if (showAddModal && !wasVisibleRef.current) {
      presentSheet()
    }

    if (!showAddModal && wasVisibleRef.current) {
      dismissSheet()
    }

    wasVisibleRef.current = showAddModal
  }, [dismissSheet, presentSheet, showAddModal])

  return (
    <BottomSheet
      sheetRef={sheetRef}
      onDismiss={onCancelHandler}
      title={t('modal.modalAddItem.title')}
      subtitle="Собери карточку в удобном формате и сразу отправь ее в тренировку."
      dynamicSizing={false}
      snapPoints={['88%']}
      scrollRef={scrollref}
      scrollContentStyle={scrollContentStyle}
      footer={
        <View style={footerStyle}>
          {isLoading ? (
            <ActivityIndicator
              size={'large'}
              color={theme.colors.palette.primery}
            />
          ) : (
            <>
              <TouchableOpacity onPress={onCancelHandler}>
                <View style={[styles.actionBtn, styles.actionBtnDanger]}>
                  <CloseIcon width={30} height={30} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <View style={[styles.actionBtn, styles.actionBtnPrimary]}>
                  <ReadyIcon width={30} height={30} />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      }
    >
      <View>
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
            title={t('modal.modalAddItem.description')}
            placeholder={t('modal.modalAddItem.description_placeholder')}
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
      </View>
    </BottomSheet>
  )
}

export default memo(ModalAddItem)
