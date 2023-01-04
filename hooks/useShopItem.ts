import { useState } from 'react';
import { gql } from 'graphql-request';
import { useAuthStore } from '~/stores/useAuthStore';
import { MutateResponse, MutationAddFavoriteShopArgs, MutationDeleteFavoriteShopArgs } from '~/types/type';
import { Item } from '~/types/shop';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

export const useShopItem = (isFavoritedCheck: boolean) => {
  const [isFavorite, setIsFavorite] = useState(isFavoritedCheck);
  const [auth] = useAuthStore();

  const addFavoriteShop = async (item: Item) => {
    setIsFavorite(true);

    const mutation = gql`
      mutation (
        $uuid: String!
        $address: String!
        $genre: String!
        $name: String!
        $url: String!
        $card: String!
        $lunch: String!
      ) {
        addFavoriteShop(
          uuid: $uuid
          address: $address
          genre: $genre
          name: $name
          url: $url
          card: $card
          lunch: $lunch
        ) {
          success
          message
        }
      }
    `;
    const { name, address, genre, url, lunch, card } = item;

    // uuidの取得は最新の状態を取得するために、キャッシュの値ではなくバックエンドと通信を行って取得する
    const { data, error } = await supabase.auth.getUser();

    // トーストを出す
    if (error) return;

    const params: MutationAddFavoriteShopArgs = {
      uuid: data.user.id,
      name,
      address,
      genre,
      url,
      lunch,
      card,
    };

    const res = await client(auth.token).request<{ addFavoriteShop: MutateResponse }>(mutation, params);

    return res.addFavoriteShop;
  };

  const deleteFavoriteShop = async (item: Item) => {
    setIsFavorite(false);

    const mutation = gql`
      mutation ($uuid: String!, $name: String!) {
        deleteFavoriteShop(uuid: $uuid, name: $name) {
          success
          message
        }
      }
    `;
    const { data, error } = await supabase.auth.getUser();

    // トーストを出す
    if (error) return;

    const params: MutationDeleteFavoriteShopArgs = {
      uuid: data.user.id,
      name: item.name,
    };

    const res = await client(auth.token).request<{ deleteFavoriteShop: MutateResponse }>(mutation, params);

    return res.deleteFavoriteShop;
  };

  return {
    isFavorite,
    auth,
    addFavoriteShop,
    deleteFavoriteShop,
  };
};
