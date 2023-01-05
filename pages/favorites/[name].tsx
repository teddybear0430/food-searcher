import { gql } from 'graphql-request';
import useSWR from 'swr';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Seo from '~/components/Seo';
import { Query, QueryUsersRegisteredAsFavoritesArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

type Props = {
  name: string;
};

const UserPage: NextPage<Props> = ({ name }) => {
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
  const { data } = useSWR<Query>(['/api/favorites', name], () => client().request(query, params));

  return (
    <>
      <Seo title={`${name}`} />
      <div>
        <h1 className="text-2xl">{name}</h1>
        <h2>お気に入りに登録したユーザー</h2>
        {data?.usersRegisteredAsFavorites && (
          <>
            {data.usersRegisteredAsFavorites.length == 0 ? (
              <p>お気に入りに登録しているユーザーはいません</p>
            ) : (
              <ul>
                {data?.usersRegisteredAsFavorites.map((item) => (
                  <li key={item?.userId}>
                    <Link href={`/user/${item?.userId}`} className="text-blue-700 hover:underline">
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { name } = context.query;

  return {
    props: {
      name,
    },
  };
};

export default UserPage;
