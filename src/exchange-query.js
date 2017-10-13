const axios = require('axios')
const EXCHANGE_ENDPOINT = 'http://api.fixer.io/latest?base=SEK'

const exchangeQuery = async (root, args, context) => {
  const ammount = args.ammount
  const countryId = args.countryId
  let exchangeRates;
  try {
    response = await axios.get(EXCHANGE_ENDPOINT)
    exchangeRates = response.data
  } catch (e) {
    throw "Server Error"
  }
  const rate = exchangeRates.rates[countryId]
  return ammount * rate
}

const exchangeRatesQuery = async (root, args, context) => {
  const ammount = args.ammount;
  const result = [];
  let exchangeRates;
  try {
    response = await axios.get(EXCHANGE_ENDPOINT)
    exchangeRates = response.data
  } catch (e) {
    throw "Server Error"
  }
  for (id in exchangeRates.rates) {
    if (exchangeRates.rates.hasOwnProperty(id)) {
      result.push({
        id,
        rate: exchangeRates.rates[id]
      })
    }
  }
  return result
}

module.exports = {
  exchangeQuery,
  exchangeRatesQuery
}