import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { withTheme } from 'react-native-paper'

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
})
function TabBarIcon({ theme, name, focused }) {
  const { colors } = theme

  return (
    <FontAwesome
      name={name}
      size={26}
      style={styles.icon}
      color={focused ? colors.primary : colors.disabled}
    />
  )
}

export default withTheme(TabBarIcon)
