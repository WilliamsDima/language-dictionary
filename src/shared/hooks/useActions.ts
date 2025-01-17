import { userActions } from './../store/slice/userSlice'
import { appActions } from './../store/slice/appSlice'
import { useMemo } from 'react'
import { useAppDispatch } from './useStore'
import { bindActionCreators } from '@reduxjs/toolkit'
import { itemsActions } from '../store/slice/itemsSlice'

const allActions = {
  ...appActions,
  ...userActions,
  ...itemsActions,
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
