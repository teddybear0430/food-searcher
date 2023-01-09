import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import ShopItem from '~/components/ShopItem/Item';
import Seo from '~/components/Seo';
import { useUserPage } from '~/hooks/api/useUserPage';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  userId: string;
};

const UserPage: NextPage<Props> = ({ userId }) => {
  const [auth] = useAuthStore();
  const { isLoggedin } = auth;

  const { data, error } = useUserPage(userId);

  return (
    <>
      <Seo title={userId} />
      {error && !data && (
        <p className="font-bold text-red-600">
          ユーザー情報の取得に失敗しました。
          <br />
          ブラウザをリロードして再度お試しください。
        </p>
      )}
      {data?.findUserByUserId && (
        <>
          <h1 className="text-2xl">
            {data.findUserByUserId?.name ? data.findUserByUserId.name : data?.findUserByUserId?.userId}
          </h1>
          {data.findUserByUserId.profile && <p className="whitespace-pre-wrap">{data.findUserByUserId.profile}</p>}
          {data.findUserByUserId.location && <p>居住地: {data.findUserByUserId.location}</p>}
          {isLoggedin && (
            <Link href="/mypage" className="text-blue-700 hover:underline">
              プロフィールを編集する
            </Link>
          )}
          <div className="mt-4">
            <h2 className="text-xl mb-2">お気に入り: {data && data.findUserByUserId?.favoriteShops.length}件</h2>
            {data && (
              <ul>
                {data.findUserByUserId?.favoriteShops.map((item) => (
                  <ShopItem
                    key={item.name}
                    item={item}
                    favoriteShops={data.findUserByUserId?.favoriteShops || []}
                    isLoggedin={Boolean(isLoggedin)}
                    userId={userId}
                  />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
      <Toaster position="top-right" />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // ユーザーが存在しないときは404を返却する
  const { userId } = context.query;
  const { data, error } = await supabase.from('users').select('user_id').eq('user_id', userId).single();

  if (data === null || error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userId,
    },
  };
};

export default UserPage;
