const axios = require('axios')
const COUNTRIES_ENDPOINT = "https://restcountries.eu/rest/v2/name/"

const countriesQuery = async(root, args, context) => {
  const { phrase } = args
  let countries = []
  try {
    response = await axios.get(COUNTRIES_ENDPOINT + phrase)
    countries = response.data
  } catch (e) {
    throw "Server error."
  }
  console.log(countries[0].currencies)
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