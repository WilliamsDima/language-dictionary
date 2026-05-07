import { helloApp } from '@/shared/helpers/ScaleUtils'
import { store } from '@/shared/store/store'
import React, { useEffect, FC } from 'react'
import { LogBox } from 'react-native'
import { EventProvider } from 'react-native-outside-press'
import { Provider } from 'react-redux'
import Routes from './Navigation/AppRoutes'
import { AuthProvider } from '@/shared/hooks/useAuth'
import BootSplash from 'react-native-bootsplash'
import { initI18n } from '@/shared/i18n'

LogBox.ignoreLogs(['Remote debugger'])

const App: FC = () => {
  useEffect(() => {
    helloApp()
    initI18n()

    const splashTimeout = setTimeout(() => {
      BootSplash.hide({ fade: true })
    }, 500)

    return () => clearTimeout(splashTimeout)
  }, [])

  return (
    <Provider store={store}>
      <AuthProvider>
        <EventProvider>
          <Routes />
        </EventProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App
