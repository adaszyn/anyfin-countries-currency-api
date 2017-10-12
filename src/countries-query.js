const axios = require('axios')
const SEARCH_COUNTRIES_ENDPOINT = 'https://restcountries.eu/rest/v2/name/';
const ALL_COUNTRIES_ENDPOINT = 'https://restcountries.eu/rest/v2/all';
const countriesQuery = async(root, args, context) => {
  let url
  const { phrase } = args
  if (!phrase || phrase === '') {
    url = ALL_COUNTRIES_ENDPOINT;
  } else {
    url = SEARCH_COUNTRIES_ENDPOINT + phrase;
  }
  let countries = []
  try {
    response = await axios.get(url)
    countries = response.data
  } catch (e) {
    throw "Server error."
  }
  return countries.map(mapToSchema)
}

const mapToSchema = (response) => ({
  id: response.alpha3Code,
  name: response.name,
  capital: response.capital,
  population: response.population,
  currency: {
    id: response.currencies[0].code,
    name: response.currencies[0].name,
    symbol: response.currencies[0].symbol
  }
})


module.exports = countriesQuery