import { request, GraphQLClient } from 'graphql-request';

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const client = new GraphQLClient(API_ENDPOINT, { headers: {} });
