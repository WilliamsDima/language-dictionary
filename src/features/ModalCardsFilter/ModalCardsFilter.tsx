import React, { FC, memo, useState } from 'react'
import { styles } from './ModalCardsFilter.styles'
import { View, Animated, TouchableOpacity } from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import Text from '@/shared/UI/Text/Text'
import Button from '@/shared/UI/Button/Button'
import { useAppNavigation } from '@/shared/hooks/useNavigation'
import { RoutesNames } from '@/app/Navigation/RoutesNames'
import { tabsWords } from '@/shared/helpers/tabsWord'
import { useActions } from '@/shared/hooks/useActions'
import { StatusItem } from '@/entities/Item/model/item'
import { languagesOptions } from '@/shared/json/languages'
import { ShowVariantListVale } from '@/shared/store/slice/userSlice'
import MultiselectDropdown from '@/shared/UI/MultiselectDropdown/MultiselectDropdown'
import { SelectOption } from '@/shared/UI/types'

const showVariantListOptions: SelectOption[] = [
  {
    label: 'Сначала слово, потом перевод',
    value: 'word_only',
  },
  {
    label: 'Сначала перевод, потом слово',
    value: 'translate_only',
  },
]

type Props = {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const ModalCardsFilter: FC<Props> = ({ visible, setVisible }) => {
  const { setFilterCardsModal } = useActions()
  const { navigate } = useAppNavigation()

  const { getAnimationStyles } = useScaleAnim({
    active: visible,
  })

  const [languages, setLanguages] = useState<SelectOption[]>([])
  const [statusSelect, setStatusSelect] = useState<StatusItem>('STUDY')

  const [showVariantSelect, setShowVariantSelect] =
    useState<SelectOption | null>(() => showVariantListOptions[0])

  const onSelectLanguages = (value: SelectOption[]) => {
    setLanguages(value)
  }

  const onSelectShowVariant = (v: SelectOption) => {
    setShowVariantSelect(v)
  }

  const onCancelHandler = () => {
    setLanguages([])
    setStatusSelect('STUDY')
    setShowVariantSelect(showVariantListOptions[0])
    setVisible(false)
  }

  const confirm = () => {
    setFilterCardsModal({
      status: statusSelect,
      languages: languages.map((it) => +it.value),
      showVariant: showVariantSelect?.value as ShowVariantListVale,
    })

    navigate(RoutesNames.cardsRepetition)
    onCancelHandler()
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
            <Text style={styles.title}>Выберите карточки для повторения</Text>

            <View style={styles.selects}>
              {tabsWords.map((it) => {
                const active = statusSelect === it.status

                return (
                  <TouchableOpacity
                    key={it.status}
                    onPress={() => {
                      setStatusSelect(it.status)
                    }}
                    style={styles.selectBtn}
                  >
                    <View
                      style={[styles.circle, active && styles.circleActive]}
                    />
                    <Text style={styles.selectBtnText}>{it.label}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View>
              <Text style={styles.selectBtnText}>Вариант показа:</Text>

              {showVariantListOptions.map((it) => {
                const active = it.value === showVariantSelect?.value
                return (
                  <TouchableOpacity
                    key={it.value}
                    onPress={() => {
                      onSelectShowVariant(it)
                    }}
                    style={styles.selectBtn}
                  >
                    <View
                      style={[styles.circle, active && styles.circleActive]}
                    />
                    <Text style={styles.selectBtnText}>{it.label}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <MultiselectDropdown
              title="Язык"
              selects={languages}
              onSelects={onSelectLanguages}
              options={languagesOptions}
              classes={{
                title: styles.titleSelect,
              }}
            />

            <View style={styles.btns}>
              <Button
                type="BORDER-TRANSPARENT"
                classes={{
                  btn: [styles.btn, styles.cancel],
                  textBtn: styles.cancelText,
                }}
                onPress={onCancelHandler}
              >
                Отмена
              </Button>

              <Button
                classes={{
                  btn: [styles.btn, styles.confirm],
                  textBtn: styles.confirmText,
                }}
                onPress={confirm}
              >
                Начать
              </Button>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalCardsFilter)
