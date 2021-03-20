const hapi = require("hapi");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-hapi");

const User = require("./models/User");

const schema = require("./graphql/schema");

const server = new ApolloServer({
  schema: schema,
});

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {});

const app = hapi.server({
  port: 4000,
  host: "localhost",
});

const init = async () => {
  await server.applyMiddleware({ app });

  app.route([
    {
      method: "GET",
      path: "/",
      handler: function (request, reply) {
        return "<h1>Мой супер API</h1>";
      },
    },
    {
      method: "GET",
      path: "/api/v1/users",
      handler: (req, reply) => {
        return User.find();
      },
    },
    {
      method: "POST",
      path: "/api/v1/users",
      handler: (req, reply) => {
        const { login, password, roles } = req.payload;

        const user = new User({
          login,
          password,
          roles,
        });
        return user.save();
      },
    },
  ]);

  await app.start();
};

init();
