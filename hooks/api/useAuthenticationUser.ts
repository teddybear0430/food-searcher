import { gql } from 'graphql-request';
import useSWR from 'swr';
import { Query } from '~/types/type';
import { client } from '~/utils/graphqlClient';

export const useAuthenticationUser = (id: string) => {
  // ユーザー情報の取得
  const query = gql`
    query ($id: ID!) {
      findUserById(id: $id) {
        name
        userId
        location
        profile
      }
    }
  `;
  const { data, error } = useSWR<Query>(id === '' ? null : ['mypage', id], () => client().request(query, { id }));

  return {
    data,
    error,
  };
};
