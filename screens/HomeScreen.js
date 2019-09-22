import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import {
  withTheme,
  Title,
  Paragraph,
  Caption,
  Modal,
  Divider,
  Avatar,
  Surface,
  Portal,
  Searchbar,
  Button,
} from 'react-native-paper'
import { get } from 'lodash'
import { fetchData } from '../constants/api'
import { useStateValue } from '../Store'

const styles = StyleSheet.create({
  flatListContainer: {
    width: '100%',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
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

function HomeScreen({ theme, ...props }) {
  const [isModalVisible, setModalVisibility] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [state, dispatch] = useStateValue()
  const { coins, favorites } = state
  const isFavorited = ({ item }) => favorites.includes(item)

  useEffect(() => {
    setLoading(true)
    const fetchCoins = async () => {
      const data = await fetchData(currentPage)

      setLoading(false)

      return dispatch({
        type: 'FETCH_DATA',
        payload: data,
      })
    }

    fetchCoins()
  }, [currentPage, dispatch])

  const fetchMoreCoins = async () => {
    setLoading(true)

    await setCurrentPage(currentPage + 1)
    const data = await fetchData(currentPage)

    setLoading(false)

    return dispatch({
      type: 'FETCH_MORE_DATA',
      payload: data,
    })
  }

  const handleFavorites = ({ item }) => {
    if (favorites.includes(item)) {
      return dispatch({
        type: 'REMOVE_FROM_FAVORITES',
        payload: item,
      })
    }

    return dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: item,
    })
  }
  const keyExtractor = (item, index) => `${item.id}${Math.random()}` || `${index}`

  const renderItem = (item) => {
    const name = get(item, 'item.name')
    const image = get(item, 'item.image')
    const price_change_24h = get(item, 'item.price_change_24h')
    const current_price = get(item, 'item.current_price')
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
              <Title style={{ color: theme.colors.primary }}>
$
                {current_price}
              </Title>
            </View>
            <View style={styles.sectionContainer}>
              <Caption>Last 24h: </Caption>
              <Caption
                style={{ color: price_change_24h < 0 ? theme.colors.error : theme.colors.accent }}
              >
                {price_change_24h}
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
                { backgroundColor: isFavorited(item) ? theme.colors.accent : theme.colors.disabled },
              ]}
            />
          </TouchableOpacity>
        </Surface>
      </TouchableOpacity>
    )
  }

  const renderItemSeparator = () => <Divider style={styles.divider} />
  const renderHeader = () => <Searchbar style={styles.searchBar} />

  const renderFooter = () => isLoading && <Button style={styles.footer} loading={isLoading} />

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Portal>
        <Modal dissmisable visible={isModalVisible} onDismiss={() => setModalVisibility(false)}>
          <Title>Example Modal</Title>
        </Modal>
      </Portal>
      <FlatList
        style={styles.flatListContainer}
        data={coins}
        extraData={coins}
        ItemSeparatorComponent={renderItemSeparator}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        initialNumToRender={20}
        keyExtractor={keyExtractor}
        onEndReached={fetchMoreCoins}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

HomeScreen.navigationOptions = {
  title: 'Crypto Info',
}

export default withTheme(HomeScreen)
