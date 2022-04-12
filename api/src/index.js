const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


const port = process.env.PORT || 4000;

// Constructing a schema and resolver functions using GraphQL schema Language
const typeDefs = gql
    `type Query{
        hello: String
    }`;

const resolvers = {
    Query: {
        hello: () => 'Hello World'
    }
};

const app = express();


// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers});
server.start().then(res => {
    server.applyMiddleware({ app, path: '/api'});
    app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    ));
});



