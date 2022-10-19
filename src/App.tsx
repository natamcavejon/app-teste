import React, { useCallback } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar, StyleSheet, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'

import {
  useFonts,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

import { OrderContextProvider } from './hooks/useOrders'
import { SnackProvider } from './hooks/useSnack'

import { theme } from './global/styles/theme'
import { Load } from './components/Load'
import { RouterNavigation } from './routes/index.routes'
import { LoadingContextProvider } from './hooks/useLoading'
import { AuthProvider } from './hooks/useAuth'
import { LocationProvider } from './hooks/useLocation'

SplashScreen.preventAutoHideAsync()

export default function App(): JSX.Element {
  // Keep the splash screen visible while we fetch resources
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return <Load />
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AuthProvider>
        <PaperProvider>
          <View style={styles.statusBar}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.colors.primary}
              translucent
            />
          </View>
          <SnackProvider>
            <LoadingContextProvider>
              <OrderContextProvider>
                <RouterNavigation />
              </OrderContextProvider>
            </LoadingContextProvider>
          </SnackProvider>
        </PaperProvider>
      </AuthProvider>
    </View>
  )
}

export const styles = StyleSheet.create({
  statusBar: {
    height: StatusBar.currentHeight,
    backgroundColor: theme.colors.primary
  }
})
