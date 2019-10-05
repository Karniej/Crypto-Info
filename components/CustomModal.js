import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Subheading, Title, Avatar, Paragraph, withTheme } from 'react-native-paper'
import { shape, string } from 'prop-types'
import { themePropTypes } from '../constants/propTypes'

const styles = StyleSheet.create({
  scrollView: {
    height: '75%',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollViewContent: {
    margin: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginHorizontal: 8,
  },
})

const CustomModal = ({ item, theme }) => {
  const { colors } = theme
  const { name, marketCap, image, description, currentPrice } = item

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.scrollViewContent, { backgroundColor: colors.surface }]}
    >
      <Avatar.Image
        style={styles.avatar}
        size={80}
        source={{ uri: image }}
      />
      <Title>{name}</Title>
      <View style={styles.sectionContainer}>
        <Subheading>Market Cap: </Subheading>
        <Subheading style={{ color: colors.accent }}>{marketCap}</Subheading>
      </View>
      <View style={styles.sectionContainer}>
        <Subheading>Current Price: </Subheading>
        <Subheading style={{ color: colors.accent }}>{currentPrice}</Subheading>
      </View>
      <Paragraph>{description}</Paragraph>
    </ScrollView>
  )
}

CustomModal.propTypes = {
  theme: themePropTypes,
  item: shape({
    name: string,
    description: string,
    image: string,
    currentPrice: string,
    marketCap: string,
  }),
}

export default withTheme(CustomModal)
