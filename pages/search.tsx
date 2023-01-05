import { gql } from 'graphql-request';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Seo from '~/components/Seo';
import ShopItem from '~/components/ShopItem/Item';
import { useGeolocated } from '~/hooks/useGeolocated';
import { useAuthStore } from '~/stores/useAuthStore';
import { Query, QueryFoodsArgs, QueryFindUserByIdArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

const Search: NextPage = () => {
  const router = useRouter();
  const userSetKeyword = router.query.keyword as string;

  const { position } = useGeolocated();
  const [auth] = useAuthStore();

  const query = gql`
    query getFoods($lat: Float!, $lng: Float!, $keyword: String, $id: ID!) {
      foods(lat: $lat, lng: $lng, keyword: $keyword) {
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
  const { latitude, longitude } = position;
  const params: QueryFoodsArgs & QueryFindUserByIdArgs = {
    keyword: userSetKeyword || '',
    // 経度と緯度の初期値にnullを設定している都合上、nullかどうかのエラーハンドリングが必要になる
    // このコンポーネントはgeolocationAPIが有効になっていないと絶対にレンダリングされることはないので、nullの場合は0を代入する
    lat: latitude === null ? 0 : latitude,
    lng: longitude === null ? 0 : longitude,
    id: auth.uuid,
  };
  const { data } = useSWR<Query>(['/api/foods', latitude, longitude, userSetKeyword], () =>
    client().request(query, params)
  );

  return (
    <>
      <Seo title="検索結果" />
      {data && (
        <ul>
          {data.foods.map((item) => (
            <ShopItem key={item.name} item={item} favoriteShops={data.findUserById?.favoriteShops || []} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Search;
