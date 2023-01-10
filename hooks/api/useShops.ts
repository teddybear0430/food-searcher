import { gql } from 'graphql-request';
import useSWR from 'swr';
import { Query, QueryShopsArgs, QueryFindUserByIdArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

export const useShops = (keyword: string, lat: number | null, lng: number | null, uuid?: string) => {
  const query = gql`
    query ($lat: Float!, $lng: Float!, $keyword: String, $id: ID!) {
      shops(lat: $lat, lng: $lng, keyword: $keyword) {
        name
        address
        genre
        url
        card
        lunch
      }

      findUserById(id: $id) {
        favoriteShops(id: $id) {
          name
        }
      }
    }
  `;

  const params: QueryShopsArgs & QueryFindUserByIdArgs = {
    keyword: keyword || '',
    // 経度と緯度の初期値にnullを設定しているため、nullかどうかのエラーハンドリングが必要になる
    lat: lat === null ? 0 : lat,
    lng: lng === null ? 0 : lng,
    id: uuid || '',
  };

  // 経度と緯度が設定されていない時はAPIリクエストを実行しない
  const { isLoading, data, error } = useSWR<Query>(
    [lat, lng].every((e) => e === null) ? null : ['shops', lat, lng, keyword || ''],
    () => client().request(query, params)
  );

  return {
    isLoading,
    data,
    error,
  };
};
