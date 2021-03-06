'use strict';

const express = require('express');
const app = express();

const graphqlHTTP = require('express-graphql');
const schema = require('./src/graphql/schema');

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

module.exports = app;