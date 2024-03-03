import { helloApp } from '@/shared/helpers/ScaleUtils'
import { store } from '@/shared/store/store'
import React, { useEffect, FC } from 'react'
import { LogBox } from 'react-native'
import { EventProvider } from 'react-native-outside-press'
import { Provider } from 'react-redux'
import Routes from './Navigation/AppRoutes'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'

// GoogleSignin.configure({
//   webClientId:
//     '528679131313-vi6p1ilocsbp1r796frhh43p6votlshh.apps.googleusercontent.com',
// })

LogBox.ignoreLogs(['Remote debugger'])

const App: FC = () => {
  useEffect(() => {
    helloApp()

    // setTimeout(SplashScreen.hide, 500)
  }, [])

  return (
    <Provider store={store}>
      <EventProvider>
        <Routes />
      </EventProvider>
    </Provider>
  )
}

export default App
