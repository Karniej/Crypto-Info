import React from 'react'
import { ScrollView, View } from 'react-native'
import { Subheading, Title, Avatar, Paragraph, withTheme } from 'react-native-paper'
import { shape, string, number } from 'prop-types'
import { propTypes } from '../../constants'
import styles from './CustomModal.styles'

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
  theme: propTypes.themePropTypes,
  item: shape({
    name: string,
    description: string,
    image: string,
    currentPrice: number,
    marketCap: number,
  }),
}

export default withTheme(CustomModal)
