const { gql } = require('apollo-server-express');

module.exports = gql`
    type Note {
        id: ID!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }

    type Query{
        notes: [Note!]!
        note(id: ID!): Note!
    }

    type Mutation{
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
    }

    scalar DateTime
    `;

