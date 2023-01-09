import { gql } from 'graphql-request';
import toast from 'react-hot-toast';
import useSWR, { useSWRConfig } from 'swr';
import { Query, MutateResponse, MutationCreateUserArgs, MutationUpdateUserArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

export type FormData = {
  userId: string;
  name: string;
  location: string;
  profile: string;
};

/**
 *  マイページの処理をまとめたカスタムフック
 */
export const useMyPage = (id: string) => {
  //新規作成処理
  const { mutate } = useSWRConfig();

  const createUserData = async (newData: FormData) => {
    const mutation = gql`
      mutation createUser($input: userInput!) {
        createUser(input: $input) {
          success
          message
        }
      }
    `;
    const params: MutationCreateUserArgs = {
      input: {
        id,
        userId: newData.userId,
        name: newData.name,
        location: newData.location,
        profile: newData.profile,
      },
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ createUser: MutateResponse }>(mutation, params);

    mutate(['mypage', id]);

    if (res.createUser.success) {
      toast.success('プロフィールの新規作成に成功しました');
    } else {
      toast.error('プロフィールの新規作成に失敗しました');
    }
  };

  // 更新処理
  const updateUserData = async (newData: FormData) => {
    const mutation = gql`
      mutation updateUser($input: userInput!) {
        updateUser(input: $input) {
          success
          message
        }
      }
    `;
    const params: MutationUpdateUserArgs = {
      input: {
        id,
        userId: newData.userId,
        name: newData.name,
        location: newData.location,
        profile: newData.profile,
      },
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ updateUser: MutateResponse }>(mutation, params);

    mutate(['mypage', id]);

    if (res.updateUser.success) {
      toast.success('プロフィールの編集に成功しました');
    } else {
      toast.error('プロフィールの編集に失敗しました');
    }
  };

  // ユーザー情報の取得
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
  const { data, error } = useSWR<Query>(['mypage', id], () => client().request(query, { id }));

  return {
    createUserData,
    updateUserData,
    data,
    error,
  };
};
