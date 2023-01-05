import { gql } from 'graphql-request';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@supabase/supabase-js';
import useSWR from 'swr';
import Button from '~/components/Button';
import Seo from '~/components/Seo';
import TextAreaField from '~/components/TextAreaField';
import TextField from '~/components/TextField';
import { useAuthStore } from '~/stores/useAuthStore';
import { Query, MutateResponse, MutationUpdateUserArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  user: User | null;
};
type FormData = {
  userId: string;
  name: string;
  location: string;
  profile: string;
};

const MyPage: NextPage<Props> = ({ user }) => {
  const {
    handleSubmit,
    register,
    // isDirty: 全体で何かしら変更があったらtrueになる
    // isValid: 何かしらエラーがあったらtrue (modeがonChange or onBlurの時のみ)
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
    // 非同期で初期値を設定するときはfalseにする
    shouldUnregister: false,
  });

  const query = gql`
    query ($id: ID!) {
      findUserById(id: $id) {
        name
        userId
        location
        profile
      }
    }
  `;

  const { isLoading, data } = useSWR<Query>(['/api/mypage', user?.id], () =>
    client().request(query, { id: user?.id || '' })
  );

  useEffect(() => {
    if (!data) return;

    // 初期値の設定
    setValue('userId', data.findUserById?.userId || '');
    setValue('name', data.findUserById?.name || '');
    setValue('location', data.findUserById?.location || '');
    setValue('profile', data.findUserById?.profile || '');
  }, [data]);

  const [auth] = useAuthStore();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const mutation = gql`
      mutation updateUser($id: ID!, $name: String, $location: String, $profile: String) {
        updateUser(id: $id, name: $name, location: $location, profile: $profile) {
          success
          message
        }
      }
    `;
    const params: MutationUpdateUserArgs = {
      id: user?.id || '',
      name: data.name,
      location: data.location,
      profile: data.profile,
    };
    const res = await client(auth.token).request<{ updateUser: MutateResponse }>(mutation, params);
    return res.updateUser;
  };

  return (
    <>
      <Seo title="マイページ" />
      <div>
        <h1 className="text-2xl">マイページ</h1>
        {user && <p>メールアドレス: {user.email}</p>}
        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputLabel="ユーザーId"
              id="userId"
              name="userId"
              type="text"
              register={register('userId', {})}
            />
            <TextField inputLabel="ユーザー名" id="name" name="name" type="text" register={register('name', {})} />
            <TextField
              inputLabel="居住地"
              id="location"
              name="location"
              type="text"
              register={register('location', {})}
            />
            <TextAreaField inputLabel="プロフィール" id="profile" name="profile" register={register('profile', {})} />
            <div className="mt-6 flex">
              <Button theme="primary" type="submit">
                保存
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // 認証時に発行される、accessToken・secretTokenがない場合はトップにリダイレクトする
  const refreshToken = context.req.cookies['my-refresh-token'];
  const accessToken = context.req.cookies['my-access-token'];
  if (!refreshToken || !accessToken) {
    return {
      redirect: {
        // 永続的なリダイレクトかどうか
        permanent: false,
        // リダイレクト先
        destination: '/',
      },
    };
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return {
      redirect: {
        permanent: false,
        // リダイレクト先
        destination: '/',
      },
    };
  }

  return {
    props: {
      user: data.user,
    },
  };
};

export default MyPage;
