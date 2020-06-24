import React from 'react'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { withTheme } from 'react-native-paper'
import { bool, string } from 'prop-types'
import { propTypes } from '../constants'

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
})
function TabBarIcon({ theme, name, isFocused }) {
  const { colors } = theme

  return (
    <FontAwesome
      name={name}
      size={26}
      style={styles.icon}
      color={isFocused ? colors.accent : colors.disabled}
    />
  )
}

TabBarIcon.propTypes = {
  theme: propTypes.themePropTypes,
  name: string,
  isFocused: bool,
}

export default withTheme(TabBarIcon)
