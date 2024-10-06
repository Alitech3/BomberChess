const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
const { User } = require("../../old/db"); // Import User model from db.js
const { registerUser, loginUser } = require("./auth"); // Import functions from auth.js

// MongoDB connection string
const uri = "mongodb+srv://chris:qQ4EAW3MjY7gE12L@bomberchess.loshv.mongodb.net/bomberChess?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Successfully connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Define your GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    createdAt: String!
  }

  type AuthResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type Query {
    users: [User]!
  }

  type Mutation {
    registerUser(username: String!, password: String!): AuthResponse!
    loginUser(username: String!, password: String!): AuthResponse!
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    users: async () => {
      return await User.find(); // Get all users
    },
  },
  Mutation: {
    registerUser: async (_, { username, password }) => {
      return await registerUser(username, password); // Call the auth function
    },
    loginUser: async (_, { username, password }) => {
      return await loginUser(username, password); // Call the auth function
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
