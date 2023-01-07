import { gql } from 'graphql-request';
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';
import Button from '~/components/Button';
import Seo from '~/components/Seo';
import TextAreaField from '~/components/TextAreaField';
import TextField from '~/components/TextField';
import { useAuthStore } from '~/stores/useAuthStore';
import { Query, MutateResponse, MutationUpdateUserArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

type FormData = {
  userId: string;
  name: string;
  location: string;
  profile: string;
};

const MyPage: NextPage = () => {
  // フォームのバリデーション
  const {
    handleSubmit,
    register,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  // ユーザーIDのチェック
  // watchを使わないと、初回レンダリング時にボタンの非活性が解除されなかった
  const watchUserIdValue = watch(['userId']);
  const isUserIdEmpty = watchUserIdValue.every((e) => e === '');

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

  const [auth] = useAuthStore();
  const { isLoggedin, uuid } = auth;

  const { isLoading, data } = useSWR<Query>(['mypage', uuid], () => client().request(query, { id: uuid }));

  // メールアドレスの取得
  const [email, setEmail] = useState('');
  const getEmail = async () => {
    const { data } = await supabase.auth.getUser();
    setEmail(data.user?.email || '');
  };

  useEffect(() => {
    getEmail();

    reset({
      userId: data?.findUserById?.userId,
      name: data?.findUserById?.name || '',
      location: data?.findUserById?.location || '',
      profile: data?.findUserById?.profile || '',
    });
  }, [data, reset]);

  // 更新処理
  const { mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<FormData> = async (newData) => {
    const mutation = gql`
      mutation updateUser($id: ID!, $userId: String, $name: String, $location: String, $profile: String) {
        updateUser(id: $id, userId: $userId, name: $name, location: $location, profile: $profile) {
          success
          message
        }
      }
    `;
    const params: MutationUpdateUserArgs = {
      id: uuid,
      userId: newData.userId,
      name: newData.name,
      location: newData.location,
      profile: newData.profile,
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ updateUser: MutateResponse }>(mutation, params);

    mutate(['mypage', uuid]);

    if (res.updateUser.success) {
      toast.success('プロフィールの編集に成功しました');
    } else {
      toast.error('プロフィールの編集に失敗しました');
    }
  };

  return (
    <>
      <Seo title="マイページ" />
      <h1 className="text-2xl">マイページ</h1>
      {!isLoading && isLoggedin && (
        <>
          {data && (
            <Link href={`/user/${data.findUserById?.userId}`} className="text-blue-700 hover:underline">
              {data.findUserById?.name ? data.findUserById?.name : data.findUserById?.userId}
            </Link>
          )}
          {email && <p>メールアドレス: {email}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputLabel="ユーザーId"
              id="userId"
              name="userId"
              type="text"
              required
              register={register('userId', {
                required: true,
              })}
            />
            {errors.userId && <p className="text-red-600">ユーザーIDが入力されていません</p>}
            <TextField
              inputLabel="ユーザー名"
              id="name"
              name="name"
              type="text"
              register={register('name', {
                maxLength: 30,
              })}
            />
            {errors.name && <p className="text-red-600">30文字以内で入力してください</p>}
            <TextField
              inputLabel="居住地"
              id="location"
              name="location"
              type="text"
              register={register('location', {
                maxLength: 30,
              })}
            />
            {errors.location && <p className="text-red-600">30文字以内で入力してください</p>}
            <TextAreaField
              inputLabel="プロフィール"
              id="profile"
              name="profile"
              register={register('profile', {
                maxLength: 200,
              })}
            />
            {errors.profile && <p className="text-red-600">200文字以内で入力してください</p>}
            <div className="mt-6 flex">
              <Button theme="primary" type="submit" disabled={isUserIdEmpty || !isValid}>
                保存
              </Button>
            </div>
          </form>
        </>
      )}
      <Toaster position="top-right" />
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

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};

export default MyPage;
