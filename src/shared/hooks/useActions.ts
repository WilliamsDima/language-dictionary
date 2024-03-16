import { userActions } from './../store/slice/userSlice'
import { appActions } from './../store/slice/appSlice'
import { useMemo } from 'react'
import { useAppDispatch } from './useStore'
import { bindActionCreators } from '@reduxjs/toolkit'

const allActions = {
  ...appActions,
  ...userActions,
}

export const useActions = () => {
  const dispatch = useAppDispatch()

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
