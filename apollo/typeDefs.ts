import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Food {
    address: String!
    genreName: String!
    name: String!
    url: String!
    card: String!
    lunch: String!
  }

  type Query {
    foods(lat: Float!, lng: Float!, keyword: String): [Food!]!
  }
`;
