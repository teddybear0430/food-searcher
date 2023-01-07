import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import Button from '~/components/Button';
import Seo from '~/components/Seo';
import TextAreaField from '~/components/TextAreaField';
import TextField from '~/components/TextField';
import { FormData, useMyPage } from '~/hooks/useMypage';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabaseClient';

const MyPage: NextPage = () => {
  const [auth] = useAuthStore();
  const { isLoggedin, uuid } = auth;
  const { data, isLoading, updateUserData, createUserData } = useMyPage(uuid);

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

  const onSubmit: SubmitHandler<FormData> = async (newData) => {
    if (data?.findUserById === null) {
      await createUserData(newData);
    } else {
      await updateUserData(newData);
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
                {data?.findUserById === null ? '新規作成' : '保存'}
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
