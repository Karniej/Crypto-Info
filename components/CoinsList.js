import React from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  Avatar,
  Button,
  Caption,
  Divider,
  Searchbar,
  Surface,
  Title,
  withTheme,
} from 'react-native-paper'
import { shapeOf, string } from 'prop-types'
import { get } from 'lodash'

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    paddingVertical: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  searchBar: {
    width: '95%',
    marginBottom: 8,
  },
  infoContainer: {
    flexGrow: 1,
  },
  surfaceContainer: {
    width: '100%',
  },
  surface: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  divider: {
    width: '100%',
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    marginHorizontal: 8,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  coinName: {
    textTransform: 'uppercase',
  },
})

const CoinsList = ({ theme, ...props }) => {
  const keyExtractor = (item, index) => `${item.id}${Math.random()}` || `${index}`

  const { colors } = theme
  const renderItem = (item) => {
    const name = get(item, 'item.name')
    const image = get(item, 'item.image')
    const priceChange24h = get(item, 'item.price_change_24h')
    const currentPrice = get(item, 'item.current_price')
    const symbol = get(item, 'item.symbol')

    return (
      <TouchableOpacity style={styles.surfaceContainer} onPress={() => setModalVisibility(true)}>
        <Surface style={styles.surface}>
          <Avatar.Image style={styles.avatar} size={28} source={{ uri: image && image }} />
          <View style={styles.infoContainer}>
            <View style={styles.sectionContainer}>
              <Title numberOfLines={1} style={styles.coinName}>
                {symbol}
    :
                {' '}
              </Title>
              <Title style={{ color: colors.primary }}>
    $
                {currentPrice}
              </Title>
            </View>
            <View style={styles.sectionContainer}>
              <Caption>Last 24h: </Caption>
              <Caption
                style={{ color: priceChange24h < 0 ? colors.error : colors.accent }}
              >
                {priceChange24h}
                {' '}
    $
              </Caption>
            </View>
          </View>
          <TouchableOpacity hitSlop={{ x: 10, y: 10 }} onPress={() => handleFavorites(item)}>
            <Avatar.Icon
              size={28}
              icon="stars"
              style={[
                styles.avatar,
                { backgroundColor: isFavorited(item) ? colors.accent : colors.disabled },
              ]}
            />
          </TouchableOpacity>
        </Surface>
      </TouchableOpacity>
    )
  }

  const renderItemSeparator = () => <Divider style={styles.divider} />
  const renderHeader = () => <Searchbar style={styles.searchBar} />

  const renderFooter = (isLoading) => isLoading && <Button style={styles.footer} loading={isLoading} />

  return (
    <FlatList
      style={styles.flatListContainer}
      ItemSeparatorComponent={renderItemSeparator}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      initialNumToRender={20}
      keyExtractor={keyExtractor}
      onEndReachedThreshold={0.2}
      contentContainerStyle={styles.contentContainer}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
}

CoinsList.propTypes = {
  theme: shapeOf({
    colors: shapeOf({
      accent: string,
      error: string,
      primary: string,
      error: string,
    }),
  }).isRequired,
}
export default withTheme(CoinsList)
