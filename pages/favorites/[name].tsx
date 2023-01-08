import { gql } from 'graphql-request';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Seo from '~/components/Seo';
import { Query, QueryUsersRegisteredAsFavoritesArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

const UserPage: NextPage = () => {
  const router = useRouter();
  // パスパラメータから値を取得
  const name = router.query.name as string;

  const query = gql`
    query ($name: String!) {
      usersRegisteredAsFavorites(name: $name) {
        userId
        name
      }
    }
  `;
  const params: QueryUsersRegisteredAsFavoritesArgs = {
    name,
  };
  const { data } = useSWR<Query>(['favorites', name], () => client().request(query, params));

  return (
    <>
      <Seo title={`${name}`} />
      <h1 className="text-2xl">{name}</h1>
      <h2 className="text-xl mb-2">お気に入りに登録したユーザー</h2>
      {data?.usersRegisteredAsFavorites && (
        <>
          {data.usersRegisteredAsFavorites.length == 0 ? (
            <p>お気に入りに登録しているユーザーはいません</p>
          ) : (
            <ul>
              {data?.usersRegisteredAsFavorites.map((item) => (
                <li key={item?.userId}>
                  <Link href={`/user/${item?.userId}`} className="text-blue-700 hover:underline">
                    {item?.name ? item.name : item?.userId}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};

export default UserPage;
