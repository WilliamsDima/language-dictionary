import { useEffect, useMemo } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useAppSelector } from '@/shared/hooks/useStore'
import { useDebouncedValue } from '@/shared/hooks/useDebounce'
import { useLazySearchSimilarItemsQuery } from '@/pages/MainScreen/api/cardsServices'
import type { SearchSimilarItemsParams } from '@/pages/MainScreen/api/types'
import { AddItemWords, SimilarHint, SimilarItem } from './Model/items'

const SIMILAR_DEBOUNCE_MS = 400
const SIMILAR_MIN_LENGTH = 2
const SIMILAR_LIMIT = 5

type Params = {
  items: AddItemWords[]
  activeItemId: number | null
  languageCode?: string
  // id редактируемой карточки — саму себя в подсказке не показываем
  excludeId?: number
}

// бэкенд ищет подстрокой по word и translate без учёта регистра — показываем
// ту пару карточки, которая совпала, иначе первую
const toSimilarItem = (item: IItem, search: string): SimilarItem => {
  const query = search.toLowerCase()
  const match =
    item.items.find(
      (it) =>
        it.word.toLowerCase().includes(query) ||
        it.translate.toLowerCase().includes(query)
    ) ?? item.items[0]

  return {
    item,
    word: match?.word ?? '',
    translate: match?.translate ?? '',
  }
}

/**
 * подсказка о похожих уже существующих карточках для активной строки слова
 * в модалке добавления: debounce ввода, поиск только при выбранном языке
 * и от SIMILAR_MIN_LENGTH символов
 */
export const useSimilarItems = ({
  items,
  activeItemId,
  languageCode,
  excludeId,
}: Params): SimilarHint | null => {
  const { isAuth } = useAppSelector((store) => store.app)

  const [searchSimilarItems, { currentData, originalArgs }] =
    useLazySearchSimilarItemsQuery()

  const activeWord = useMemo(
    () => items.find((it) => it.id === activeItemId)?.word.trim() ?? '',
    [items, activeItemId]
  )

  const debouncedWord = useDebouncedValue(activeWord, SIMILAR_DEBOUNCE_MS)

  const queryArgs = useMemo<SearchSimilarItemsParams | null>(() => {
    if (!isAuth || !languageCode || debouncedWord.length < SIMILAR_MIN_LENGTH) {
      return null
    }

    return {
      search: debouncedWord,
      language: languageCode,
      limit: SIMILAR_LIMIT,
    }
  }, [isAuth, languageCode, debouncedWord])

  // результат относится к актуальным аргументам (а не к прошлому вводу/языку)
  const isActualResult = useMemo(
    () =>
      !!queryArgs &&
      !!originalArgs &&
      queryArgs.search === originalArgs.search &&
      queryArgs.language === originalArgs.language,
    [queryArgs, originalArgs]
  )

  const hint = useMemo<SimilarHint | null>(() => {
    if (!queryArgs || !isActualResult || !currentData) return null

    const found = currentData.items.filter((it) => it.id !== excludeId)

    if (!found.length) return null

    const excludedCount = currentData.items.length - found.length
    const total = currentData.total - excludedCount

    return {
      items: found.map((it) => toSimilarItem(it, queryArgs.search)),
      restCount: Math.max(total - found.length, 0),
    }
  }, [queryArgs, isActualResult, currentData, excludeId])

  useEffect(() => {
    if (queryArgs) {
      searchSimilarItems(queryArgs)
    }
  }, [queryArgs, searchSimilarItems])

  return hint
}
