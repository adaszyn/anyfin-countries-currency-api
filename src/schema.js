const { makeExecutableSchema } = require('graphql-tools')
const countriesQuery = require('./countries-query')
const {exchangeQuery, exchangeRatesQuery} = require('./exchange-query')

const typeDefs = `
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

const resolvers = {
  Query: {
    countries: countriesQuery,
    exchange: exchangeQuery,
    exchangeRates: exchangeRatesQuery
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

function context(headers, secrets) {
  return {
    headers,
    secrets,
  };
};

module.exports = {
  context,
  schema
}
