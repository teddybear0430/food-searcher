import { gql } from 'graphql-request';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Loading from '~/components/Loading';
import Seo from '~/components/Seo';
import ShopItem from '~/components/ShopItem/Item';
import { useAuthStore } from '~/stores/useAuthStore';
import { useGeolocated } from '~/hooks/useGeolocated';
import { useStaticLatAndLng } from '~/stores/useStaticLatAndLng';
import { Query, QueryFoodsArgs, QueryFindUserByIdArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

const Search: NextPage = () => {
  useGeolocated();

  const router = useRouter();
  const keyword = router.query.keyword as string;

  const [position] = useStaticLatAndLng();
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
  const { lat, lng } = position;
  const params: QueryFoodsArgs & QueryFindUserByIdArgs = {
    keyword: keyword || '',
    // 経度と緯度の初期値にnullを設定している都合上、nullかどうかのエラーハンドリングが必要になる
    // このコンポーネントはgeolocationAPIが有効になっていないと絶対にレンダリングされることはないので、nullの場合は0を代入する
    lat: lat === null ? 0 : lat,
    lng: lng === null ? 0 : lng,
    id: auth.uuid,
  };
  const { isLoading, data, error } = useSWR<Query>(['/api/foods', lat, lng, keyword], () =>
    client().request(query, params)
  );

  return (
    <>
      <Seo title="検索結果" />
      {position.lat !== null && position.lng !== null ? (
        <>
          {error && (
            <p className="font-bold text-red-600">
              エラーが発生しました。
              <br />
              ブラウザをリロードして再度お試しください。
            </p>
          )}
          {isLoading ? (
            <div className="flex flex-col items-center">
              <p className="font-bold text-blue-600 text-center pb-4">検索中...</p>
              <Loading />
            </div>
          ) : (
            <>
              {data?.foods && (
                <>
                  {data.foods.length !== 0 && (
                    <ul>
                      {data.foods.map((item) => (
                        <ShopItem key={item.name} item={item} favoriteShops={data.findUserById?.favoriteShops || []} />
                      ))}
                    </ul>
                  )}
                  {!isLoading && !error && data.foods.length === 0 && (
                    <p className="text-bold">近くのお店が見つかりませんでした。</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="font-bold text-blue-600 text-center pb-4">
            位置情報の取得中です。
            <br />
            この画面が表示され続ける場合は位置情報を有効にしてください。
          </p>
          <Loading />
        </div>
      )}
    </>
  );
};

export default Search;
