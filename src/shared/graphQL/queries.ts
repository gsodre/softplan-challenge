import { gql } from "apollo-boost";

export const GET_CHARACTER_BY_ID = gql`
  query Character($id: Int!) {
    getCharacter(where: { id: $id }) {
      id
      name
      description
      thumbnail
      series {
        name
      }
    }
  }
`;

export const UPDATE_CHARACTER = gql`
  mutation updateCharacter($id: ID!, $name: String!, $description: String) {
    updateCharacter(id: $id, name: $name, description: $description) @client {
      id
    }
  }
`;

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
