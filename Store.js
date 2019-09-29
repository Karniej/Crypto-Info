import React, { createContext, useReducer, useContext } from 'react'
import { node } from 'prop-types'

const initialState = {
  coins: [],
  favorites: [],
  isDarkModeOn: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, coins: action.payload }
    case 'FETCH_MORE_DATA':
      return { ...state, coins: [...state.coins, ...action.payload] }
    case 'ADD_TO_FAVORITES':
      return { ...state, favorites: [...state.favorites, action.payload] }
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites.filter((element) => element.id !== action.payload.id)],
      }
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkModeOn: action.payload,
      }
    default:
      return state
  }
}
const Store = createContext()
function StoreProvider({ children }) {
  return <Store.Provider value={useReducer(reducer, initialState)}>{children}</Store.Provider>
}

StoreProvider.propTypes = {
  children: node,
}
const useStateValue = () => useContext(Store)

export { initialState, Store, reducer, StoreProvider, useStateValue }
