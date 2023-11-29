import { CodegenConfig } from "@graphql-codegen/cli";
// npm i -D typescript @graphql-codegen/cli @graphql-codegen/client-preset @graphql-typed-document-node/core

const config: CodegenConfig = {
  schema: "https://aryav.nl/graphql/",
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx,js,jsc}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
