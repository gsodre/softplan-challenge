import { gql } from "apollo-boost";

export const GET_CHARACTERS = gql`
  query Character($limit: Int!, $offset: Int!) {
    charactersWithTotal(limit: $limit, offset: $offset) {
      total
      data {
        id
        name
        thumbnail
      }
    }
  }
`;
