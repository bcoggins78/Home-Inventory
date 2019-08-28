// Add required modules
const express = require('express');
const logger = require("morgan");
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

// Import schema and resolvers for graphql
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})
app.use(isAuth);
app.use(logger("dev"));

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

// Establish connection to the database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/home-inventory";
mongoose.connect(MONGODB_URI);

// Define port
const PORT = process.env.PORT || 3001;

// Start server listening on defined port
app.listen(PORT, () => console.log(`🌎 ==> API server now on port ${PORT}!`));