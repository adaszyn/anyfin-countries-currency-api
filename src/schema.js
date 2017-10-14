const { makeExecutableSchema } = require("graphql-tools");
const countriesQuery = require("./countries-query");
const { exchangeQuery, exchangeRatesQuery } = require("./exchange-query");
const typeDefs = require("./graphql-type-definition");

const resolvers = {
  Query: {
    countries: countriesQuery,
    exchange: exchangeQuery,
    exchangeRates: exchangeRatesQuery
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

function context(headers, secrets) {
  return {
    headers,
    secrets
  };
}

module.exports = {
  context,
  schema
};
