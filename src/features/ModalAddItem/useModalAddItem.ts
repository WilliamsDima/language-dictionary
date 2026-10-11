import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { ILanguage } from '@/shared/API/services/languages/types'
import {
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AddItemWords } from './Model/items'
import useKeyboardState from '@/shared/hooks/useKeyboardState'
import { ScrollView } from 'react-native'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { useCards } from '@/shared/hooks/useCards'
import { useLanguageByCode } from '@/shared/hooks/useLanguageByCode'
import { IItem } from '@/entities/Item/model/item'
import { useSimilarItems } from './useSimilarItems'

export const useModalAddItem = () => {
  const { setShowAddModal, setItemEdit } = useActions()

  const { itemEdit, showAddModal } = useAppSelector((store) => store.user)
  const { isAuth } = useAppSelector((store) => store.app)

  const { updateItemHandler, addItemHandler } = useCards()

  const { isOpen } = useKeyboardState()
  const scrollref = useRef<ScrollView>(null)

  const [language, setLanguage] = useState<undefined | ILanguage>()

  const [items, setItems] = useState<AddItemWords[]>(() =>
    itemEdit
      ? itemEdit.items
      : [
          {
            id: +new Date(),
            word: '',
            translate: '',
          },
        ]
  )

  const [description, setDescription] = useState('')

  const [errorLanguage, setErrorLanguage] = useState(false)
  const [errorItems, setErrorItems] = useState(false)

  // строка, слово в которой редактировали последней, — для неё ищем похожие карточки
  const [activeItemId, setActiveItemId] = useState<number | null>(null)

  const itemEditLanguage = useLanguageByCode(itemEdit?.language)

  const similarHint = useSimilarItems({
    items,
    activeItemId,
    languageCode: language?.code,
    excludeId: itemEdit?.id,
  })

  // пока язык не выбран, поля слов заблокированы; при редактировании язык уже есть
  const isLanguageLocked = useMemo(
    () => !itemEdit && !language,
    [itemEdit, language]
  )

  const addItem = useCallback(() => {
    setItems((prev) => {
      const id = +new Date()
      return [
        ...prev,
        {
          id,
          word: '',
          translate: '',
        },
      ]
    })
  }, [])

  const { getAnimationStyles } = useScaleAnim({
    active: showAddModal,
  })

  const onCancelHandler = useCallback(() => {
    setItems([
      {
        id: +new Date(),
        word: '',
        translate: '',
      },
    ])
    setErrorItems(false)
    setErrorLanguage(false)
    setShowAddModal(false)
    setLanguage(undefined)
    setDescription('')
    setActiveItemId(null)
    setItemEdit(null)
  }, [setItemEdit, setShowAddModal])

  const [, onConfirm, isLoading] = useActionState(async (_prevState: null) => {
    if (!isAuth) return null

    const itemsError = items.some(
      (it) => !it.word.trim() || !it.translate.trim()
    )
    const error = !language || itemsError

    if (!language) setErrorLanguage(true)
    if (itemsError) setErrorItems(true)
    if (error) return null

    if (itemEdit?.id) {
      await updateItemHandler({
        ...itemEdit,
        items,
        description,
        language: language.code,
      })
      setItemEdit(null)
      onCancelHandler()
    } else {
      await addItemHandler({
        items,
        description,
        language: language.code,
        date: new Date().toISOString(),
        id: +new Date(),
        status: 'STUDY',
      })
      onCancelHandler()
    }

    return null
  }, null)

  const onSelectLanguage = useCallback((lang: ILanguage) => {
    setErrorLanguage(false)
    setLanguage(lang)
  }, [])

  // тап по похожей карточке: вместо добавления открываем её на редактирование —
  // items/description/language подтянутся эффектами по itemEdit ниже
  const onSelectSimilar = useCallback(
    (item: IItem) => {
      setErrorItems(false)
      setErrorLanguage(false)
      setActiveItemId(null)
      setItemEdit(item)
      scrollref.current?.scrollTo({ y: 0, animated: true })
    },
    [setItemEdit]
  )

  useEffect(() => {
    if (isOpen) {
      scrollref.current?.scrollToEnd({ animated: true })
    }

    return () => {}
  }, [isOpen, scrollref])

  useEffect(() => {
    if (itemEdit) {
      setItems(itemEdit.items)
      setDescription(itemEdit.description)
    }
  }, [itemEdit])

  // язык резолвится из itemEdit.language (code) отдельно, так как список
  // языков может ещё не быть в кэше в момент открытия модалки на редактирование
  useEffect(() => {
    if (itemEdit && itemEditLanguage) {
      setLanguage(itemEditLanguage)
    }
  }, [itemEdit, itemEditLanguage])

  return {
    onSelectLanguage,
    onConfirm,
    getAnimationStyles,
    addItem,
    setDescription,
    setItems,
    onCancelHandler,
    onSelectSimilar,
    setErrorItems,
    setActiveItemId,
    errorItems,
    scrollref,
    language,
    isLoading,
    description,
    showAddModal,
    isOpen,
    items,
    errorLanguage,
    similarHint,
    activeItemId,
    isLanguageLocked,
  }
}
