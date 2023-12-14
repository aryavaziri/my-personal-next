import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readFileSync } from "fs";
import { router as authRoutes } from "./routes/auth.js";
import { isAuth } from "./controllers/authController.js";
import { router as listRoutes } from "./routes/list.js";
import { router as api } from "./routes/api.js"
import { join, dirname } from "path"
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'


import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./graphql/resolvers.js";
import graphqlUpload from "graphql-upload/graphqlUploadExpress.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  uploads: true,
  credentials: true
});
await server.start();

app.use(cookieParser())
app.use(cors({ origin: ['https://www.aryav.nl', 'http://localhost', 'http://localhost:5000', 'http://aryav.nl:5000', 'https://aryav.nl', '*'], methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static('public'))
app.use(isAuth);
app.use(express.json())
app.use(
  "/graphql",
  graphqlUpload({ maxFileSize: 100000000, maxFiles: 10 }),
  expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) })
);
app.use('/auth', authRoutes);
app.use("/api", api);

app.use((req, res) => {
  // console.log(req)
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
    // app.use('/static', express.static(join(__dirname, 'public')));
    // console.log(join(__dirname, 'public', 'static'))
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
