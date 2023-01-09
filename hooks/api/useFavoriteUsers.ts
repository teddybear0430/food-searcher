import { gql } from 'graphql-request';
import useSWR from 'swr';
import { Query, QueryUsersRegisteredAsFavoritesArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

export const useFavoriteUsers = (name: string, shouldFetch: boolean) => {
  const query = gql`
    query ($name: String!) {
      usersRegisteredAsFavorites(name: $name) {
        userId
        name
      }
    }
  `;

  const params: QueryUsersRegisteredAsFavoritesArgs = {
    name,
  };

  // モーダルが閉じている時はデータの取得を行わないようにする
  // https://swr.vercel.app/docs/conditional-fetching
  const { data, error, isLoading } = useSWR<Query>(shouldFetch ? ['favorites', name] : null, () =>
    client().request(query, params)
  );

  return {
    data,
    error,
    isLoading,
  };
};
