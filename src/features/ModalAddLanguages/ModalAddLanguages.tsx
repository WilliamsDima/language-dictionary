import React, { FC, memo, useEffect, useState } from 'react'
import { styles } from './ModalAddLanguages.styles'
import {
  View,
  Animated,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import Modal from '@/shared/UI/Modal/Modal'
import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import Text from '@/shared/UI/Text/Text'
import DoneIcon from '@/assets/icons/UI/done-white-64.svg'
import { ILanguage, languages } from '@/shared/json/languages'
import { useTranslation } from '@/shared/i18n/types'
import Button from '@/shared/UI/Button/Button'

type Props = {
  visible: boolean
  selects?: ILanguage[]
  multiselect?: boolean
  onConfirm: (langs: ILanguage[]) => void
  setVisible: (v: boolean) => void
}

const ModalAddLanguages: FC<Props> = ({
  visible,
  selects,
  multiselect = true,
  setVisible,
  onConfirm,
}) => {
  const { t } = useTranslation()

  const { getAnimationStyles } = useScaleAnim({
    active: visible,
  })

  const [languagesSelects, setLanguagesSelects] = useState<ILanguage[]>([])
  const [isonsError, setIsonsError] = useState<number[]>([])

  const onSelectLanguages = (l: ILanguage) => {
    if (multiselect) {
      setLanguagesSelects((prev) => {
        const isLang = prev.some((it) => it.id === l.id)

        if (isLang) {
          return prev.filter((it) => it.id !== l.id)
        }

        return [...prev, l]
      })
    } else {
      setLanguagesSelects([l])
    }
  }

  const onCancelHandler = () => {
    setVisible(false)
    setLanguagesSelects([])
  }

  useEffect(() => {
    if (selects?.length && visible) {
      setLanguagesSelects(selects)
    }
  }, [selects, visible])

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
            <View style={styles.drag} />
            <View style={styles.top}>
              <Text style={styles.title}>
                {t('modal.modalAddLanguages.title')}
              </Text>
              <Text style={styles.subtitle}>
                {multiselect
                  ? 'Выбери несколько языков для статистики и подбора карточек'
                  : 'Выбери один основной язык профиля'}
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scroll}
              contentContainerStyle={styles.scrollContainer}
            >
              {languages.map((it, i) => {
                const active = languagesSelects.some(
                  (item) => item.id === it.id
                )

                const isLast = i === languages.length - 1

                const iconIsError = isonsError.includes(it.id)

                return (
                  <TouchableOpacity
                    key={it.id}
                    style={[
                      styles.item,
                      active && !multiselect && styles.itemActiveSingle,
                      active && styles.itemActive,
                      isLast && { marginBottom: 50 },
                    ]}
                    onPress={() => {
                      onSelectLanguages(it)
                    }}
                  >
                    {multiselect && (
                      <View style={[styles.done, active && styles.doneActive]}>
                        {active && <DoneIcon width={15} height={15} />}
                      </View>
                    )}

                    {!!it.country.flag && !iconIsError && (
                      <Image
                        source={{ uri: it.country.flag }}
                        style={styles.flag}
                        onError={(error) => {
                          setIsonsError((prev) => [...prev, it.id])
                        }}
                      />
                    )}
                    <Text
                      style={[
                        styles.full_name,
                        active && !multiselect && styles.full_nameActive,
                      ]}
                    >
                      {it.full_name}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

            <View style={styles.btns}>
              <Button
                type="BORDER-TRANSPARENT"
                classes={{
                  btn: [styles.actionBtn, styles.actionBtnCancel],
                  textBtn: styles.actionTextCancel,
                }}
                onPress={onCancelHandler}
              >
                {t('ui.cancel')}
              </Button>

              <Button
                classes={{
                  btn: [styles.actionBtn, styles.actionBtnConfirm],
                  textBtn: styles.actionTextConfirm,
                }}
                onPress={() => {
                  onConfirm(languagesSelects)
                  onCancelHandler()
                }}
              >
                {t('ui.apply')}
              </Button>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  )
}

export default memo(ModalAddLanguages)
