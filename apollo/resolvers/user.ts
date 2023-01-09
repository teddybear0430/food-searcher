import { MutationResolvers, QueryResolvers } from '~/types/type';
import { now } from '~/utils/createCurrentTimestamp';
import { supabase } from '~/utils/supabaseClient';
import * as z from 'zod';

/**
 * usersテーブルの主キー(uuid)を使ってユーザー情報を取得
 * */
const findUserById: QueryResolvers['findUserById'] = async (_, { id }) => {
  // 検索画面で認証していない時はnullを返却する
  if (!id) return null;

  try {
    // サインアップ直後はusersテーブルに認証中のユーザーのレコードが存在しないので、正常に処理が実行された場合はnullを返却する
    const { data: findUuid, error: findUuIdError } = await supabase.from('users').select('id').eq('id', id);
    if (findUuIdError) {
      throw new Error('ユーザー情報の取得時にエラーが発生しました');
    }
    if (findUuid?.length === 0 && findUuIdError === null) {
      return null;
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_id, name, location, profile')
      .eq('id', id)
      .single();

    if (userError) {
      throw new Error('ユーザー情報の取得時にエラーが発生しました');
    }

    const { data: favoriteShops, error: favoriteShopsError } = await supabase
      .from('favorite_shops')
      .select('name, address, genre, url, lunch, card')
      .eq('uuid', id);

    if (favoriteShopsError) {
      throw new Error('お気に入りに登録した店舗の取得時にエラーが発生しました');
    }

    const { user_id, name, location, profile } = userData;

    return {
      id,
      name,
      userId: user_id,
      location,
      profile,
      favoriteShops,
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * ユーザーID(user_id)を使ってユーザー情報を取得
 * */
const findUserByUserId: QueryResolvers['findUserByUserId'] = async (_, { userId }) => {
  // 存在しないユーザーIDが渡ってきた時はnullを返却する
  if (!userId) return null;

  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, name, location, profile')
      .eq('user_id', userId)
      .single();

    if (userError) {
      throw new Error('ユーザー情報の取得時にエラーが発生しました');
    }

    const { data: favoriteShops, error: favoriteShopsError } = await supabase
      .from('favorite_shops')
      .select('name, address, genre, url, lunch, card, users!inner (id)')
      .eq('users.user_id', userId);

    if (favoriteShopsError) {
      throw new Error('お気に入りに登録した店舗の取得時にエラーが発生しました');
    }

    const { id, name, location, profile } = userData;

    return {
      id,
      name,
      userId,
      location,
      profile,
      favoriteShops,
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * ユーザー情報の新規作成
 * */
const createUser: MutationResolvers['createUser'] = async (_, args, context: { currentUserId: string }) => {
  const { input } = args;

  // uuidの存在チェックとmutationから渡ってきたuuidが一致しているかのチェック
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid || authenticatedUuid !== input.id) {
    return {
      success: false,
      message: 'ユーザー情報の作成は許可されていません',
    };
  }

  const schema = z.object({
    id: z.string().uuid().nonempty(),
    userId: z.string().nonempty(),
    name: z.string(),
    location: z.string(),
    // 200文字以下の文字列
    profile: z.string().max(200),
  });

  try {
    // バリデーションチェックの実施
    schema.parse(input);
    const { id, userId, name, location, profile } = input;

    // ユーザー情報の新規作成
    const { error } = await supabase
      .from('users')
      .insert({ id, user_id: userId, name, location, profile, created_at: now, updated_at: now });

    if (error) {
      return {
        success: false,
        message: 'ユーザー情報の作成時にエラーが発生しました',
      };
    }

    return {
      success: true,
      message: 'ユーザー情報の作成に成功しました',
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * ログインしているユーザー情報の更新
 * */
const updateUser: MutationResolvers['updateUser'] = async (_, args, context: { currentUserId: string }) => {
  const { input } = args;

  // uuidの存在チェックとmutationから渡ってきたuuidが一致しているかのチェック
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid || authenticatedUuid !== input.id) {
    return {
      success: false,
      message: 'ユーザー情報の更新は許可されていません',
    };
  }

  const schema = z.object({
    id: z.string().uuid().nonempty(),
    userId: z.string().nonempty(),
    name: z.string(),
    location: z.string(),
    // 200文字以下の文字列
    profile: z.string().max(200),
  });

  try {
    // バリデーションチェックの実施
    schema.parse(input);
    const { id, userId, name, location, profile } = input;

    // 更新対象のユーザー情報の取得と存在チェック
    const { data: findUserData, error: findUserError } = await supabase.from('users').select().eq('id', id).single();

    if (findUserError) {
      return {
        success: false,
        message: 'ユーザー情報の取得時にエラーが発生しました',
      };
    }
    if (!findUserData) {
      return {
        success: false,
        message: 'ユーザー情報の取得に失敗しました',
      };
    }

    // ユーザー情報の更新
    const { error: updateUserError } = await supabase
      .from('users')
      .update({ user_id: userId, name, location, profile, updated_at: now })
      .eq('id', id);

    if (updateUserError) {
      return {
        success: false,
        message: 'ユーザー情報の更新時にエラーが発生しました',
      };
    }

    return {
      success: true,
      message: 'ユーザー情報の更新に成功しました',
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * 飲食店をお気に入りに登録したユーザーを取得する
 * */
const usersRegisteredAsFavorites: QueryResolvers['usersRegisteredAsFavorites'] = async (_, { name }) => {
  try {
    const { data, error } = await supabase
      // favorite_shopsテーブルをinner joinして、お気に入りに登録した店舗の名前と合致するレコードを取得する
      // https://stackoverflow.com/questions/69665030/supabase-filter-by-column-value-of-foreign-key-row
      .from('users')
      .select('user_id, name, favorite_shops!inner (uuid)')
      .eq('favorite_shops.name', name);

    if (error) {
      throw new Error('ユーザー情報の取得時にエラーが発生しました');
    }

    if (!data) return [];

    return data.map((e) => ({
      name: e.name,
      userId: e.user_id,
    }));
  } catch (er) {
    console.error(er);
    throw er;
  }
};

export { findUserById, findUserByUserId, createUser, updateUser, usersRegisteredAsFavorites };
