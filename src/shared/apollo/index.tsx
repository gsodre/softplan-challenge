import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: `https://marvelql.herokuapp.com`,
  resolvers: {
    Mutation: {
      updateCharacter: (_: any, variables: { id: any }, { cache }: any) => {
        const id = `Character:${variables.id}`;
        const data = { ...variables };
        cache.writeData({ id, data });
        return null;
      },
    },
  },
});

export const Apollo: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
