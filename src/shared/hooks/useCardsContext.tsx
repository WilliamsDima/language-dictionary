import React, { FC, useMemo, createContext, useContext, ReactNode } from 'react'
import { IItem } from '@/entities/Item/model/item'
import { useCards } from './useCards'

type IContext = {
  updateItemHandler: (itemEdit: IItem) => Promise<void> | undefined
  addItemHandler: (item: IItem) => Promise<void> | undefined
  deleteItemHandler: (item: IItem) => Promise<void> | undefined
}

const CardContext = createContext<IContext>({} as IContext)

type CardsProviderType = {
  children: ReactNode
}

export const CardProvider: FC<CardsProviderType> = ({ children }) => {
  const { addItemHandler, deleteItemHandler, updateItemHandler } = useCards()

  const value = useMemo(() => {
    return {
      updateItemHandler,
      addItemHandler,
      deleteItemHandler,
    }
  }, [updateItemHandler, addItemHandler, deleteItemHandler])

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export const useCardsContext = () => {
  return useContext(CardContext)
}
