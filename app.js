import { ApolloServer } from "apollo-server-express";
import express from "express";
import connectMongo from "./db/db.js";
import dotenv from "dotenv";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import { checkAuth } from "./passport/authenticate.js";
import localhost from "./security/localhost.js";
import production from "./security/production.js";
import helmet from "helmet";

dotenv.config();

(async () => {
  try {
    const connect = await connectMongo();
    if (connect) {
      console.log("connected succesfully");
    }

    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({ req, res }) => {
        if (req) {
          const user = await checkAuth(req, res);
          console.log("app", user);
          return {
            req,
            res,
            user,
          };
        }
      },
    });

    const app = express();
    app.use(helmet.hidePoweredBy());

    server.applyMiddleware({ app });
    process.env.NODE_ENV = process.env.NODE_ENV || "development";
    if (process.env.NODE_ENV === "production") {
      production(app, 3000);
    } else {
      localhost(app, 8000, 3000);
    }

    /*app.listen({ port: 3001 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:3001${server.graphqlPath}`
      )
    );*/
  } catch (e) {
    console.log("server error: " + e.message);
  }
})();
