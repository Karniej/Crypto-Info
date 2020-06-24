const API_URL = 'https://api.coingecko.com/api/v3/coins/'

export async function fetchData(page = 1) {
  // eslint-disable-next-line max-len
  const response = await fetch(`${API_URL}markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`)

  const data = await response.json()

  return data
}

export async function fetchSingleItem(id) {
  const response = await fetch(`${API_URL}${id}`)

  const item = await response.json()

  return item
}
export default {
  API_URL,
  fetchData,
  fetchSingleItem,
}
