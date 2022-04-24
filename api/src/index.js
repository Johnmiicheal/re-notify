const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

// Local module imports
const db = require('./db');
const resolvers = require('./resolvers');
const models = require('./models');
const typeDefs = require('./schema');

// Running the server on port specified in .env {or default: 4000}
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

// Connect to the database
db.connect(DB_HOST);


// Apollo Server Setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: () => {
        return { models }
    }
});

server.start().then(res => {
    server.applyMiddleware({ app, path: '/api'});
    app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    ));
});



