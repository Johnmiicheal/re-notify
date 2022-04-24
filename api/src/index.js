const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Local module imports
const db = require('./db');
const resolvers = require('./resolvers');
const models = require('./models');
const typeDefs = require('./schema');


// Running the server on port specified in .env {or default: 4000}
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

// Get user info from a JWT
const getUser = token => {
    if (token) {
        try{
            return jwt.verify(token, process.env.JWT_SECRET);
        }catch(err){
            throw new Error('Session invalid or expired');
        }
    }
}

// Connect to the database
db.connect(DB_HOST);


// Apollo Server Setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: ({req}) => {
        const token = req.headers.authorization;
        const user = getUser(token)
        console.log(user);
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



