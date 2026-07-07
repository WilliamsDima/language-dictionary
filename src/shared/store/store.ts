import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { AppState } from 'react-native'

import appReducer from './slice/appSlice'
import userReducer from './slice/userSlice'
import itemsReducer from './slice/itemsSlice'
import { baseApi } from '../API/baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { rtkQueryErrorLogger } from './middleware/rtkQueryErrorLogger'

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  items: itemsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, rtkQueryErrorLogger),
})

// setupListeners по умолчанию слушает браузерные события фокуса/онлайна,
// которых нет в React Native — без этого хендлера refetchOnFocus/-Reconnect
// у RTK Query эндпоинтов (например useStreakStatus) никогда бы не срабатывали
setupListeners(store.dispatch, (dispatch, { onFocus, onFocusLost }) => {
  const subscription = AppState.addEventListener('change', (status) => {
    dispatch(status === 'active' ? onFocus() : onFocusLost())
  })

  return () => subscription.remove()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
