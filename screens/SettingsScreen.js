import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
})

export default function SettingsScreen() {
  return <ScrollView style={styles.container} />
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
}
