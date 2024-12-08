import { helloApp } from '@/shared/helpers/ScaleUtils'
import { store } from '@/shared/store/store'
import React, { useEffect, FC } from 'react'
import { LogBox } from 'react-native'
import { EventProvider } from 'react-native-outside-press'
import { Provider } from 'react-redux'
import Routes from './Navigation/AppRoutes'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AuthProvider } from '@/shared/hooks/useAuth'
import VKLogin from 'react-native-vkontakte-login'
import CodePush from 'react-native-code-push'
import { GOOGLE_WEB_CLIENT_ID, VK_APP } from '@env'

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START }

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
  scopes: ['profile', 'email'],
})

VKLogin.initialize(VK_APP)

LogBox.ignoreLogs(['Remote debugger'])

const App: FC = () => {
  useEffect(() => {
    helloApp()

    // Запуск проверки обновлений вручную
    CodePush.sync({
      installMode: CodePush.InstallMode.IMMEDIATE,
      updateDialog: {
        appendReleaseDescription: true,
        optionalUpdateMessage: 'An update is available!',
        optionalIgnoreButtonLabel: 'Ignore',
        optionalInstallButtonLabel: 'Install',
      },
    })

    // setTimeout(SplashScreen.hide, 500)
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

export default CodePush(codePushOptions)(App)
