"use client";
import { onError } from '@apollo/client/link/error';

import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

function makeClient() {
  // const httpLink = new HttpLink({
    //     uri: "http://localhost:3000/graphql",
    // });
    // const httpLink = createUploadLink({ uri: "https://www.aryav.nl:3000/graphql" ,headers: {"Apollo-Require-Preflight": "true"}});
    const httpLink = createUploadLink({ uri: "http://localhost:3000/graphql" ,headers: {"Apollo-Require-Preflight": "true"}});
    
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
          // You can also display the error message in your UI here
        });
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        // You can also display the network error message in your UI here
      }
    });
    
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            errorLink,
            httpLink,
          ])
        : ApolloLink.from([errorLink,httpLink]),
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
