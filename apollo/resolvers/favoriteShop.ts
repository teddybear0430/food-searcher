import { MutationResolvers, QueryResolvers } from '~/types/type';
import { supabase } from '~/utils/supabaseClient';

/**
 * ユーザーがお気に入りに登録した店舗の名前を取得
 * */
export const favoriteShops: QueryResolvers['favoriteShops'] = async (_, { uuid }) => {
  try {
    const { data, error } = await supabase
      .from('favorite_shops')
      .select('name, address, genre, url, lunch, card')
      .eq('uuid', uuid);

    if (data === null) return [];

    if (error) {
      throw new Error('お気に入りに登録した店舗の取得を行う際にエラーが発生しました');
    }

    return data;
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * 検索した店舗をお気に入りに登録する
 * */
export const addFavoriteShop: MutationResolvers['addFavoriteShop'] = async (_, args, context) => {
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid) {
    return {
      success: false,
      message: 'お気に入りの追加は許可されていません',
    };
  }

  try {
    const { uuid, name, address, genre, url, lunch, card } = args;
    const { error } = await supabase.from('favorite_shops').insert({ uuid, name, address, genre, url, lunch, card });

    if (error) {
      throw new Error('お気に入りの追加を行う際にエラーが発生しました');
    }

    return {
      success: true,
      message: 'お気に入りの追加に成功しました',
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * 検索した店舗をお気に入りから削除する
 * */
export const deleteFavoriteShop: MutationResolvers['deleteFavoriteShop'] = async (_, args, context) => {
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid) {
    return {
      success: false,
      message: 'お気に入りの削除は許可されていません',
    };
  }

  try {
    const { name } = args;
    const { error } = await supabase.from('favorite_shops').delete().eq('uuid', args.uuid).eq('name', name);

    if (error) {
      throw new Error('お気に入りの削除を行う際にエラーが発生しました');
    }

    return {
      success: true,
      message: 'お気に入りの削除に成功しました',
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};
