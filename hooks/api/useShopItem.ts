import { gql } from 'graphql-request';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';
import { MutateResponse, MutationAddFavoriteShopArgs, MutationDeleteFavoriteShopArgs } from '~/types/type';
import { Item } from '~/types/shop';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

export const useShopItem = (isFavoritedCheck: boolean, userId?: string) => {
  const [isFavorite, setIsFavorite] = useState(isFavoritedCheck);
  const { mutate } = useSWRConfig();

  const addFavoriteShop = async (item: Item) => {
    setIsFavorite(true);

    const mutation = gql`
      mutation (
        $id: ID!
        $address: String!
        $genre: String!
        $name: String!
        $url: String!
        $card: String!
        $lunch: String!
      ) {
        addFavoriteShop(id: $id, address: $address, genre: $genre, name: $name, url: $url, card: $card, lunch: $lunch) {
          success
          message
        }
      }
    `;
    const { name, address, genre, url, lunch, card } = item;

    // uuidの取得は最新の状態を取得するために、キャッシュに保持されている値ではなくバックエンドと通信を行って取得する
    const { data, error } = await supabase.auth.getUser();

    // トーストを出す
    if (error) {
      toast.error('お気に入りの削除に失敗しました');
    }

    const params: MutationAddFavoriteShopArgs = {
      id: data.user?.id || '',
      name,
      address,
      genre,
      url,
      lunch,
      card,
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ addFavoriteShop: MutateResponse }>(mutation, params);

    // ユーザーページでお気に入りが更新された時はデータのリフェッチを行う
    if (res.addFavoriteShop.success && userId) {
      mutate(['user', userId]);
    }
  };

  const deleteFavoriteShop = async (item: Item) => {
    setIsFavorite(false);

    const mutation = gql`
      mutation ($id: ID!, $name: String!) {
        deleteFavoriteShop(id: $id, name: $name) {
          success
          message
        }
      }
    `;
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      toast.error('お気に入りの削除に失敗しました');
    }

    const params: MutationDeleteFavoriteShopArgs = {
      id: data.user?.id || '',
      name: item.name,
    };

    // JWT tokenの取得
    const { session } = (await supabase.auth.getSession()).data;
    const res = await client(session?.access_token).request<{ deleteFavoriteShop: MutateResponse }>(mutation, params);

    if (res.deleteFavoriteShop.success && userId) {
      mutate(['user', userId]);
    }
  };

  return {
    isFavorite,
    addFavoriteShop,
    deleteFavoriteShop,
  };
};
