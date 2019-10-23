/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import {
  withTheme,
  Divider,
  Button,
  Portal,
  Modal,
} from 'react-native-paper'
import { propTypes, constants, api } from '../../constants'
import { useStateValue } from '../../Store'
import { CustomModal, ListElement } from '../../components'
import styles from './HomeScreen.styles'

const { fetchData, fetchSingleItem } = api

function HomeScreen({ theme }) {
  const [isLoading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    currentPrice: 'placeholder',
    description: 'placeholder',
    image: 'placeholder',
    marketCap: 'placeholder',
    name: 'placeholder',
  })
  const [isModalVisible, setModalVisibility] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [state, dispatch] = useStateValue()
  const { coins, favorites } = state
  const isFavorited = (item) => favorites.includes(item)
  const { colors } = theme

  useEffect(() => {
    setLoading(true)
    const fetchCoins = async () => {
      const data = await fetchData(1)

      setLoading(false)

      return dispatch({
        type: 'FETCH_DATA',
        payload: data,
      })
    }

    fetchCoins()
  }, [dispatch])

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

  const handleFavorites = (item) => {
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

  const getCurrentItemInfo = async (item) => {
    const { id, name, image } = item
    const currentPrice = item.current_price
    const marketCap = item.market_cap
    const fetchedData = await fetchSingleItem(id)
    const { description } = await fetchedData

    const currentItemWithData = {
      name,
      currentPrice,
      image,
      marketCap,
      description: description.en,
    }
    await setCurrentItem(currentItemWithData)

    setModalVisibility(!isModalVisible)
  }

  const renderModalContent = () => <CustomModal item={currentItem} isLoading={isLoading} />

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <ListElement
      item={item}
      onPressListElement={() => getCurrentItemInfo(item)}
      onPressAddToFavorites={() => handleFavorites(item)}
      isFavorited={isFavorited(item)}
    />
  )

  const renderItemSeparator = () => <Divider style={styles.divider} />

  const renderFooter = () => isLoading && <Button style={styles.footer} loading={isLoading} />

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={styles.modalContent}
          dissmisable
          onDismiss={() => setModalVisibility(false)}
        >
          {renderModalContent()}
        </Modal>
      </Portal>
      <FlatList
        style={styles.flatListContainer}
        data={coins}
        extraData={coins}
        ItemSeparatorComponent={renderItemSeparator}
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

HomeScreen.propTypes = {
  theme: propTypes.themePropTypes,
}

HomeScreen.navigationOptions = ({ theme }) => ({
  headerStyle: {
    backgroundColor: constants.isLightTheme(theme, 'surface'),
  },
  headerTitleStyle: {
    color: constants.isLightTheme(theme, 'text'),
  },
  title: 'Crypto Info',
})

export default withTheme(HomeScreen)
