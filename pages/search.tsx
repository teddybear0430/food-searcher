import { gql } from 'graphql-request';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ShopItem from '~/components/ShopItem/Item';
import { useGeolocated } from '~/hooks/useGeolocated';
import { Query, QueryFoodsArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

const Search: NextPage = () => {
  const router = useRouter();
  const userSetKeyword = router.query.keyword as string;

  const { position } = useGeolocated();

  const query = gql`
    query getFoods($lat: Float!, $lng: Float!, $keyword: String) {
      foods(lat: $lat, lng: $lng, keyword: $keyword) {
        name
        address
        genreName
        url
        card
        lunch
      }
    }
  `;
  const { latitude, longitude } = position;
  const params: QueryFoodsArgs = {
    keyword: userSetKeyword,
    // 経度と緯度の初期値にNullを設定している都合上、nullかどうかのエラーハンドリングが必要になる
    // このコンポーネントはgeolocationAPIが有効になっていないと絶対にレンダリングされることはないので、
    // nullの場合は0を代入する
    lat: latitude === null ? 0 : latitude,
    lng: longitude === null ? 0 : longitude,
  };
  const { isLoading, data, error } = useSWR<Query>(['/api/foods', latitude, longitude, userSetKeyword], () =>
    client().request(query, params)
  );

  return (
    <div>
      {isLoading && <p>ローディング</p>}
      {error && !isLoading && <strong>エラーが発生しました</strong>}
      {!error && !isLoading && (
        <>
          {data && (
            <>
              {data.foods.length === 0 && <p>お店が見つかりませんでした</p>}
              <ul>
                {data.foods.map((item) => (
                  <ShopItem key={item.name} item={item} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
