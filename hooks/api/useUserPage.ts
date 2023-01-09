import { gql } from 'graphql-request';
import useSWR from 'swr';
import { Query } from '~/types/type';
import { client } from '~/utils/graphqlClient';

export const useUserPage = (userId: string) => {
  const query = gql`
    query ($userId: String!) {
      findUserByUserId(userId: $userId) {
        name
        location
        profile

        favoriteShops(userId: $userId) {
          name
          address
          genre
          url
          card
          lunch
        }
      }
    }
  `;

  const { data, error } = useSWR<Query>(['user', userId], () => client().request(query, { userId }));

  return {
    data,
    error,
  };
};
