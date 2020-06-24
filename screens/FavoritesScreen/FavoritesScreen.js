import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import {
  withTheme,
  Caption,
  Modal,
  Divider,
  Portal,
  Button,
} from 'react-native-paper'
import { useStateValue } from '../../Store'
import { propTypes, constants, api } from '../../constants'
import { CustomModal, ListElement } from '../../components'
import styles from './FavoritesScreen.styles'

const { fetchSingleItem } = api

function FavoritesScreen({ theme }) {
  const [isModalVisible, setModalVisibility] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    currentPrice: 'placeholder',
    description: 'placeholder',
    image: 'placeholder',
    marketCap: 'placeholder',
    name: 'placeholder',
  })
  const [isLoading] = useState(false)
  const [state, dispatch] = useStateValue()
  const { favorites } = state
  const isFavorited = ({ item }) => favorites.includes(item)
  const { colors } = theme
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
  const keyExtractor = (item, index) => `${item.id}${Math.random()}` || `${index}`

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <ListElement
      item={item}
      onPressListElement={() => getCurrentItemInfo(item)}
      onPressAddToFavorites={() => handleFavorites(item)}
      isFavorited={isFavorited(item)}
    />)

  const renderItemSeparator = () => <Divider style={styles.divider} />
  const renderEmpty = () => <Caption>No favorites selected yet.</Caption>
  const renderFooter = () => isLoading && <Button style={styles.footer} loading={isLoading} />
  const renderModalContent = () => <CustomModal item={currentItem} />

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
        data={favorites}
        extraData={favorites}
        ItemSeparatorComponent={renderItemSeparator}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        initialNumToRender={20}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

FavoritesScreen.propTypes = {
  theme: propTypes.themePropTypes,
}
FavoritesScreen.navigationOptions = ({ theme }) => ({
  title: 'Favorites',
  headerStyle: {
    backgroundColor: constants.isLightTheme(theme, 'surface'),
  },
  headerTitleStyle: {
    color: constants.isLightTheme(theme, 'text'),
  },
})

export default withTheme(FavoritesScreen)
