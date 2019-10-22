import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Switch, Subheading, withTheme } from 'react-native-paper'
import { propTypes, constants } from '../constants'
import { useStateValue } from '../Store'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 2,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
    width: '100%',
  },
})

function SettingsScreen({ theme }) {
  const { colors } = theme
  const [state, dispatch] = useStateValue()
  const { isDarkModeOn } = state

  const handleThemeChange = () => dispatch({
    type: 'TOGGLE_THEME',
    payload: !isDarkModeOn,
  })

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.row}>
        <Subheading style={{ color: colors.accent }}>Dark Mode</Subheading>
        <Switch value={isDarkModeOn} onValueChange={handleThemeChange} />
      </View>
    </View>
  )
}

SettingsScreen.propTypes = {
  theme: propTypes.themePropTypes,
}

SettingsScreen.navigationOptions = ({ theme }) => ({
  title: 'Settings',
  headerStyle: {
    backgroundColor: constants.isLightTheme(theme, 'surface'),
  },
  headerTitleStyle: {
    color: constants.isLightTheme(theme, 'text'),
  },
})

export default withTheme(SettingsScreen)
