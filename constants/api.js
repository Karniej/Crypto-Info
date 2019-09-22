// eslint-disable-next-line max-len
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20'

export async function fetchData(page = 1) {
  const response = await fetch(`${API_URL}&page=${page}&sparkline=false`)

  const data = await response.json()

  return data
}

export default {
  API_URL,
  fetchData,
}
