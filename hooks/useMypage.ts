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
export const useMyPage = (uuid: string) => {
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
  const { isLoading, data } = useSWR<Query>(['mypage', uuid], () => client().request(query, { id: uuid }));

  //新規作成処理
  const { mutate } = useSWRConfig();

  const createUserData = async (newData: FormData) => {
    const mutation = gql`
      mutation createUser($id: ID!, $userId: String!, $name: String, $location: String, $profile: String) {
        createUser(id: $id, userId: $userId, name: $name, location: $location, profile: $profile) {
          success
          message
        }
      }
    `;
    const params: MutationCreateUserArgs = {
      id: uuid,
      userId: newData.userId,
      name: newData.name,
      location: newData.location,
      profile: newData.profile,
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ createUser: MutateResponse }>(mutation, params);

    mutate(['mypage', uuid]);

    if (res.createUser.success) {
      toast.success('プロフィールの新規作成に成功しました');
    } else {
      toast.error('プロフィールの新規作成に失敗しました');
    }
  };

  // 更新処理
  const updateUserData = async (newData: FormData) => {
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

  return {
    isLoading,
    data,
    createUserData,
    updateUserData,
  };
};
