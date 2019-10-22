import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Provider as PaperProvider } from 'react-native-paper'
import { bool } from 'prop-types'
import { themes } from './constants'

import AppNavigator from './navigation/AppNavigator'
import { StoreProvider, Store } from './Store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true)
}

function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      <StoreProvider>
        <Store.Consumer>
          { (value) => {
            const { isDarkModeOn } = value[0]

            return (
              <PaperProvider theme={isDarkModeOn ? themes.primaryDark : themes.primary}>
                <AppNavigator theme={isDarkModeOn ? 'dark' : 'light'} />
              </PaperProvider>
            )
          }}
        </Store.Consumer>
      </StoreProvider>
    </View>
  )
}

export default App
App.propTypes = {
  skipLoadingScreen: bool.isRequired,
}
