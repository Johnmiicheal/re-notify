const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;




let notes = [
    { id: '1', content: "This is a note", author:'Eren Yeager'},
    { id: '2', content: "This is a completely different note", author:'Eden Thorne'},
    { id: '3', content: "Hey look, I wrote this!", author:'Mikkel Nielson'}
];

// Constructing a schema and resolver functions using GraphQL schema Language
const typeDefs = gql
`type Note{
    id: ID!
    content: String!
    author: String!
}
type Query{
    hello: String!
    notes: [Note!]!
    note(id: ID!): Note!
}
type Mutation {
    newNote(content: String!): Note!
}`;

const resolvers = {
    Query: {
        hello: () => 'Hello World',
        notes: () => async() => {
            return await models.Note.find();
        },
        note: (parent, args) => {
            return notes.find(note => note.id === args.id);
        }
    },

    Mutation: {
        newNote: (parent, args) => {
            let noteValue = { 
                id: String(notes.length + 1),
                content: args.content,
                author: 'Eren Yeager'
            };
            notes.push(noteValue);
            return noteValue;
        }
    },  

};



const app = express();

// Connect to the database
db.connect(DB_HOST);


// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers});
server.start().then(res => {
    server.applyMiddleware({ app, path: '/api'});
    app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    ));
});



