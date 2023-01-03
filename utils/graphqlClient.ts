import { GraphQLClient } from 'graphql-request';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const client = (token?: string) => {
  return new GraphQLClient(API_ENDPOINT, {
    ...(token !== undefined
      ? {
          headers: { authorization: `Bearer ${token}` },
        }
      : {}),
  });
};
