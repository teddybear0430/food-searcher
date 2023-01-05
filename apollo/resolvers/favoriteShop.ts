import { MutationResolvers } from '~/types/type';
import { supabase } from '~/utils/supabaseClient';

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
    const { id, name, address, genre, url, lunch, card } = args;
    const { error } = await supabase
      .from('favorite_shops')
      .insert({ uuid: id, name, address, genre, url, lunch, card });

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
    const { error } = await supabase.from('favorite_shops').delete().eq('uuid', args.id).eq('name', name);

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
