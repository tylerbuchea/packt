import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

let token;
const authLink = setContext(async (req, { headers }) => {
  token = token || (await localStorage.getItem("JWT_TOKEN"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/graphql"
});

const client = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache()
});

export default client;
