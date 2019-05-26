import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import AppNavigator from "./navigation/AppNavigator";
import client from "../client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <AppNavigator />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
