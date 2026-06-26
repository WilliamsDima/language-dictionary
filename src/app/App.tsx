import '@/shared/styles/unistyles'

import { helloApp } from '@/shared/helpers/ScaleUtils'
import { store } from '@/shared/store/store'
import React, { useEffect, FC } from 'react'
import { LogBox } from 'react-native'
import { EventProvider } from 'react-native-outside-press'
import { Provider } from 'react-redux'
import Routes from './Navigation/AppRoutes'
import { AuthProvider, useAuth } from '@/shared/hooks/useAuth'
import { configureGoogleSignIn } from '@/shared/firebase/auth'
import BootSplash from 'react-native-bootsplash'
import { initI18n } from '@/shared/i18n'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

LogBox.ignoreLogs(['Remote debugger'])

const AppContent: FC = () => {
  const { isBootstrapping } = useAuth()

  useEffect(() => {
    if (!isBootstrapping) {
      BootSplash.hide({ fade: true })
    }
  }, [isBootstrapping])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <EventProvider>
            <Routes />
          </EventProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const App: FC = () => {
  useEffect(() => {
    helloApp()
    initI18n()
    configureGoogleSignIn()
  }, [])

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  )
}

export default App
