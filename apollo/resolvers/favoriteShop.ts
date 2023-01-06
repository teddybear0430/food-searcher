import { MutationResolvers } from '~/types/type';
import { now } from '~/utils/createCurrentTimestamp';
import { supabase } from '~/utils/supabaseClient';
import * as z from 'zod';

/**
 * 検索した店舗をお気に入りに登録する
 * */
export const addFavoriteShop: MutationResolvers['addFavoriteShop'] = async (
  _,
  args,
  context: { currentUserId: string }
) => {
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid || authenticatedUuid !== args.id) {
    return {
      success: false,
      message: 'お気に入りの追加は許可されていません',
    };
  }

  const schema = z.object({
    id: z.string().uuid().nonempty(),
    address: z.string(),
    genre: z.string(),
    name: z.string(),
    url: z.string().url(),
    card: z.string(),
    lunch: z.string(),
  });

  try {
    // バリデーションチェックの実施
    schema.parse(args);
    const { id, name, address, genre, url, lunch, card } = args;

    const { error } = await supabase
      .from('favorite_shops')
      .insert({ uuid: id, name, address, genre, url, lunch, card, created_at: now, updated_at: now });

    if (error) {
      throw new Error('お気に入りの追加時にエラーが発生しました');
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
export const deleteFavoriteShop: MutationResolvers['deleteFavoriteShop'] = async (
  _,
  args,
  context: { currentUserId: string }
) => {
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid || authenticatedUuid !== args.id) {
    return {
      success: false,
      message: 'お気に入りの削除は許可されていません',
    };
  }

  const schema = z.object({
    id: z.string().uuid().nonempty(),
    name: z.string().nonempty(),
  });

  try {
    // バリデーションチェックの実施
    schema.parse(args);
    const { name } = args;

    const { error } = await supabase.from('favorite_shops').delete().eq('uuid', args.id).eq('name', name);

    if (error) {
      throw new Error('お気に入りの削除時にエラーが発生しました');
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
