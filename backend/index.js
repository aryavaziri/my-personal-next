import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readFileSync } from "fs";
import { router as authRoutes, isAuth } from "./routes/auth.js";
import { router as listRoutes } from "./routes/list.js";

import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers.js";
import graphqlUpload from "graphql-upload/graphqlUploadExpress.mjs";

const app = express();
// app.use((req, res, next) => {
//   console.log(req)
//   next()
// })

const typeDefs = gql(
  readFileSync("./graphql/schema.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers, cache: 'bounded' }),
  uploads: true
});
await server.start();

app.use(cors());
// app.use(cors({ origin: ['https://www.aryav.nl', 'http://localhost', 'https://aryav.nl'], methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use('/static', express.static('public'))
app.use(authRoutes);
app.use("/api", listRoutes);
app.use(
  "/graphql",
  // isAuth,
  express.json(),
  graphqlUpload({ maxFileSize: 10000000, maxFiles: 10 }),
  expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) })
);

app.use((req, res) => {
  res.status(404).send("ERROR 404 - PAGE NOT FOUND");
});

app.use((error, req, res, next) => {
  console.log(error)
  console.log(error.message);
  res.status(error.statusCode || 500).send(error.message);
});

mongoose
  .connect(process.env.DB_uri)
  .then(() => {
    console.log("Listening to port 3000...")
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
