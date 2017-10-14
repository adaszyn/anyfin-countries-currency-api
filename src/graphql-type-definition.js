module.exports = `
type Currency {
  id: String,
  name: String,
  symbol: String
}
type ExchangeRate {
  id: String,
  rate: Float
}
type Country {
  id: String,
  name: String,
  capital: String,
  population: Int,
  currency: Currency
}
type Query {
  countries(phrase: String): [Country]
  exchange(countryId: String!, ammount: Float): Float,
  exchangeRates: [ExchangeRate]
}
`;
