import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { gql } from 'graphql-request';
import { client } from '~/utils/graphqlClient';
import { useGeolocated } from '~/lib/hooks/useGeolocated';
import { Query, QueryFoodsArgs } from '~/types/type';

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
    client.request(query, params)
  );

  return (
    <div>
      {error && <strong>エラーが発生しました</strong>}
      {isLoading && <p>ローディング</p>}
      {data?.foods.length === 0 && <p>お店が見つかりませんでした</p>}
      {data && (
        <>
          <ul>
            {data.foods.map((item) => (
              <li key={item.name}>
                <h3>
                  <a href={item.url}>{item.name}</a>
                </h3>
                <p>住所: {item.address}</p>
                <p>カードの利用: {item.card}</p>
                <p>ランチ: {item.lunch}</p>
                <p>ジャンル: {item.genreName}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Search;
