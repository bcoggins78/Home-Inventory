const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Item {
        _id: ID!
        name: String!
        serial: String
        model: String
        description: String
        estValue: Float
        image: String
        comment: String
        creator: User!
    }

    type User {
        _id: ID!
        userName: String!
        password: String
        email: String!
        firstName: String!
        lastName: String!
        insName: String
        insPolicy: String
        insContact: String
        createdItems: [Item!]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input ItemInput {
        name: String!
        serial: String
        model: String
        description: String
        estValue: Float
        image: String
        comment: String
    }

    input UserInput {
        userName: String!
        password: String!
        email: String!
        firstName: String!
        lastName: String!
        insName: String
        insPolicy: String
        insContact: String
    }

    type RootQuery {
        items: [Item!]!
        login(userName: String!, password: String!): AuthData!
    }

    type RootMutation {
        createItem(itemInput: ItemInput): Item
        createUser(userInput: UserInput): User
        deleteItem(itemId: ID!): Item!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)