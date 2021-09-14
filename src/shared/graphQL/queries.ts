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

export const GET_FILTERED_CHARACTERS = gql`
  query Character($nameStartsWith: String!) {
    characters(where: { nameStartsWith: $nameStartsWith }) {
      id
      name
      thumbnail
    }
  }
`;
