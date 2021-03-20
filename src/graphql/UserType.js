const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    login: { type: GraphQLString },
    password: { type: GraphQLString },
    roles: { type: new GraphQLList(GraphQLString) },
  }),
});

module.exports = UserType;
