import { useScaleAnim } from '@/shared/hooks/useScaleAnim'
import { ILanguage } from '@/shared/json/languages'
import { useEffect, useRef, useState } from 'react'
import { AddItemWords } from './Model/items'
import useKeyboardState from '@/shared/hooks/useKeyboardState'
import { ScrollView } from 'react-native'
import { useGetUserProfileQuery } from '@/pages/ProfileScreen/api/userServices'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useActions } from '@/shared/hooks/useActions'
import { useCardsContext } from '@/shared/hooks/useCardsContext'

export const useModalAddItem = () => {
  const { setShowAddModal, setItemEdit } = useActions()

  const { itemEdit } = useAppSelector((store) => store.user)
  const { showAddModal, firebaseData } = useAppSelector((store) => store.user)

  const { data: profile } = useGetUserProfileQuery(firebaseData?.uid)

  const [isLoading, setIsLoading] = useState(false)

  const { updateItemHandler, addItemHandler } = useCardsContext()

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

  const addItem = () => {
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
  }

  const { getAnimationStyles } = useScaleAnim({
    active: showAddModal,
  })

  const onCancelHandler = () => {
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
  }

  const onConfirm = async () => {
    // console.log('onConfirm', firebaseData)
    // console.log('onConfirm', profile)

    if (firebaseData && profile) {
      const itemsError = items.some(
        (it) => !it.word.trim() || !it.translate.trim()
      )

      const error = !language || itemsError

      if (!language) {
        setErrorLanguage(true)
      }

      if (itemsError) {
        setErrorItems(true)
      }

      if (error) return

      if (itemEdit?.idDoc) {
        setIsLoading(true)
        await updateItemHandler({ ...itemEdit, items, description, language })
        setIsLoading(false)
        setItemEdit(null)
        onCancelHandler()
      } else {
        setIsLoading(true)
        await addItemHandler({
          items,
          description,
          language,
          date: new Date(),
          id: +new Date(),
          status: 'STUDY',
        })
        setIsLoading(false)
        onCancelHandler()
      }
    }
  }

  const onSelectLanguage = (lang: ILanguage) => {
    setErrorLanguage(false)
    setLanguage(lang)
  }

  useEffect(() => {
    if (isOpen) {
      scrollref.current?.scrollToEnd({ animated: true })
    }

    return () => {}
  }, [isOpen, scrollref])

  useEffect(() => {
    if (itemEdit) {
      setItems(itemEdit.items)
      setLanguage(itemEdit.language)
      setDescription(itemEdit.description)
    }
  }, [itemEdit])

  return {
    onSelectLanguage,
    onConfirm,
    getAnimationStyles,
    addItem,
    setDescription,
    setItems,
    onCancelHandler,
    setErrorItems,
    errorItems,
    scrollref,
    language,
    isLoading,
    description,
    showAddModal,
    isOpen,
    items,
    errorLanguage,
  }
}
