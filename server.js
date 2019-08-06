// Add required modules
const express = require('express');
const logger = require("morgan");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

// Import schema and resolvers for graphql
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

// Define port
const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(logger("dev"));

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

// Establish connection to the database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/home-inventory";
mongoose.connect(MONGODB_URI);

// Start server listening on defined port
app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});