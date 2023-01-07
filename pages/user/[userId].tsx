import { gql } from 'graphql-request';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import useSWR from 'swr';
import { Toaster } from 'react-hot-toast';
import ShopItem from '~/components/ShopItem/Item';
import Seo from '~/components/Seo';
import { useAuthStore } from '~/stores/useAuthStore';
import { Query } from '~/types/type';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  userId: string;
};

const UserPage: NextPage<Props> = ({ userId }) => {
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

  const { data } = useSWR<Query>(['user', userId], () => client().request(query, { userId }));

  const [auth] = useAuthStore();
  const { isLoggedin } = auth;

  return (
    <>
      <Seo title={userId} />
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
