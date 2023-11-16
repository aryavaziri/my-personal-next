"use client";
import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloNextAppProvider, NextSSRInMemoryCache, SSRMultipartLink, NextSSRApolloClient } from "@apollo/experimental-nextjs-app-support/ssr";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useEffect } from 'react'

if (process.env.NODE_ENV === "development") { loadDevMessages(); loadErrorMessages() }

function makeClient(token) {
  // console.log(token)
  const httpLink = createUploadLink({ uri: "https://aryav.nl/graphql/", headers: { "Apollo-Require-Preflight": "true", 'authorization': token ? `Bearer ${token}` : "" } })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ])
        : httpLink,
    credentials: 'include'
  });
}

export function ApolloWrapper2({ children }) {
  // let token = localStorage.getItem('accessToken')
  let token = ''
  useEffect(() => {
    if (typeof window !== "undefined") { token = localStorage.getItem('accessToken'); console.log(token) }
  }, [])

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(typeof window !== "undefined" && localStorage.getItem('accessToken'))}>
      {children}
    </ApolloNextAppProvider>
  );
}
