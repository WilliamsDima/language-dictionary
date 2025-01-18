import { configureStore, combineReducers } from '@reduxjs/toolkit'

import appReducer from './slice/appSlice'
import userReducer from './slice/userSlice'
import itemsReducer from './slice/itemsSlice'
import { baseApi } from '../API/baseApi'
import { setupListeners } from '@reduxjs/toolkit/query'

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
    }).concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
