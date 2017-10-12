const { makeExecutableSchema } = require('graphql-tools')
const countriesQuery = require('./countries-query')
const exchangeQuery = require('./exchange-query')

const typeDefs = `
  type Currency {
    id: String,
    name: String,
    symbol: String
  }
  type Country {
    id: String,
    name: String,
    capital: String,
    population: Int,
    currency: Currency
  }
  type Query {
    searchCountry(phrase: String!): [Country] 
    exchange(countryId: String!, ammount: Float!): Float
  }
`;

const resolvers = {
  Query: {
    searchCountry: countriesQuery,
    exchange: exchangeQuery
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
