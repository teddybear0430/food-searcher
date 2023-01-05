import { gql } from 'graphql-request';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { supabase } from '~/utils/supabaseClient';
import useSWR from 'swr';
import Seo from '~/components/Seo';
import ShopItem from '~/components/ShopItem/Item';
import { useAuthStore } from '~/stores/useAuthStore';
import { Query } from '~/types/type';
import { client } from '~/utils/graphqlClient';

type Props = {
  userId: string;
};

const UserPage: NextPage<Props> = ({ userId }) => {
  const query = gql`
    query ($userId: String!) {
      findUserByUserId(userId: $userId) {
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

  const { data } = useSWR<Query>(['/api/mypage', userId], () => client().request(query, { userId }));

  const [auth] = useAuthStore();

  return (
    <>
      <Seo title={userId} />
      <h1 className="text-2xl">{userId}</h1>
      {data?.findUserByUserId && (
        <div>
          {data.findUserByUserId.location && <p>居住地: {data.findUserByUserId.location}</p>}
          {data.findUserByUserId.profile && (
            <>
              <h2>プロフィール</h2>
              <p>{data.findUserByUserId.profile}</p>
            </>
          )}
        </div>
      )}
      {auth.isLoggedin && auth.uuid && (
        <Link href="/mypage" className="text-blue-700 hover:underline">
          プロフィールを編集する
        </Link>
      )}
      <div className="mt-4">
        <h2 className="text-2xl">お気に入り: {data && data.findUserByUserId?.favoriteShops.length}件</h2>
        {data && (
          <ul>
            {data.findUserByUserId?.favoriteShops.map((item) => (
              <ShopItem key={item.name} item={item} favoriteShops={data.findUserByUserId?.favoriteShops || []} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { userId } = context.query;

  // ユーザーが存在しないときは404を返却する
  const { data } = await supabase.from('users').select('user_id').eq('user_id', userId).single();
  if (data === null) {
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
