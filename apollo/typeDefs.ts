import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Food {
    address: String!
    genreName: String!
    name: String!
    url: String!
  }

  type Query {
    foods(keyword: String): [Food!]!
  }
`;
