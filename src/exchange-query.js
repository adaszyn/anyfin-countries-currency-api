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

module.exports = exchangeQuery