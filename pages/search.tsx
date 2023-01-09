import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Loading from '~/components/Loading';
import Seo from '~/components/Seo';
import ShopItem from '~/components/ShopItem/Item';
import { useAuthStore } from '~/stores/useAuthStore';
import { useFoods } from '~/hooks/api/useFoods';
import { useGeolocated } from '~/hooks/useGeolocated';

const Search: NextPage = () => {
  const router = useRouter();
  const keyword = (router.query.keyword as string) || '';

  const [auth] = useAuthStore();
  const { isLoggedin, uuid } = auth;

  const { position } = useGeolocated();
  const { latitude: lat, longitude: lng } = position;

  const { isLoading, data, error } = useFoods(keyword, lat, lng, uuid);

  return (
    <>
      <Seo title="検索結果" />
      {lat !== null && lng !== null ? (
        <>
          {isLoading ? (
            <div className="flex flex-col items-center">
              <p className="font-bold text-blue-600 text-center pb-4">検索中...</p>
              <Loading />
            </div>
          ) : (
            <>
              {error && !data && (
                <p className="font-bold text-red-600">
                  エラーが発生しました。
                  <br />
                  ブラウザをリロードして再度お試しください。
                </p>
              )}
              {data?.foods && (
                <>
                  {data.foods.length !== 0 && (
                    <ul>
                      {data.foods.map((item) => (
                        <ShopItem
                          key={item.name}
                          item={item}
                          favoriteShops={data.findUserById?.favoriteShops || []}
                          isLoggedin={Boolean(isLoggedin)}
                        />
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
          <Toaster position="top-right" />
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
