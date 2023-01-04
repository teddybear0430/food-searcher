import { MutationResolvers, QueryResolvers } from '~/types/type';
import { supabase } from '~/utils/supabaseClient';

/**
 * usersテーブルの主キー(uuid)を使ってユーザー情報を取得
 * */
const findUserById = async (id: string) => {
  const { data, error } = await supabase.from('users').select('user_id, name, location, profile').eq('id', id).single();
  if (error) {
    throw new Error('ユーザー情報の取得を行う際にエラーが発生しました');
  }

  const { user_id, name, location, profile } = data;

  return {
    userId: user_id,
    name,
    location,
    profile,
  };
};

/**
 * ユーザーIDを使ってユーザー情報を取得
 * */
const findUserByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('user_id, name, location, profile')
    .eq('user_id', userId)
    .single();

  if (error) {
    throw new Error('ユーザー情報の取得を行う際にエラーが発生しました');
  }

  const { user_id, name, location, profile } = data;

  return {
    userId: user_id,
    name,
    location,
    profile,
  };
};

/**
 * ユーザー情報の取得
 * or検索ができる関数を使用すると、id(uuid)が空の時にsupabaseで例外として処理されてしまったので、
 * 検索に使用する値によって処理を分割した
 *
 * https://www.supabase.jp/docs/reference/javascript/or
 * */
const findUser: QueryResolvers['findUser'] = async (_, { id, userId }) => {
  try {
    if (id) {
      return findUserById(id);
    } else if (userId) {
      return findUserByUserId(userId);
    } else {
      // どちらも値がセットされていない時は空のオブジェクトを返却する
      return {};
    }
  } catch (er) {
    console.error(er);
    throw er;
  }
};

/**
 * ログインしているユーザー情報の更新
 * */
const updateUser: MutationResolvers['updateUser'] = async (_, args, context) => {
  // uuidの取得と存在チェック
  // 認証済みユーザーのuuidが取得できない時点で処理を中断する
  const authenticatedUuid = context.currentUserId;
  if (!authenticatedUuid) {
    return {
      success: false,
      message: 'ユーザー情報の更新は許可されていません',
    };
  }

  const { id, userId, name, location, profile } = args;

  try {
    // 更新対象のユーザー情報の取得と存在チェック
    const { data: findUserData, error: findUserError } = await supabase.from('users').select().eq('id', id).single();

    if (findUserError) {
      throw new Error('ユーザー情報の取得を行う際にエラーが発生しました');
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
      .update({ user_id: userId, name, location, profile })
      .eq('id', id);

    if (updateUserError) {
      throw new Error('ユーザー情報の更新を行う際にエラーが発生しました');
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
      throw new Error('お気に入りに登録したユーザーの登録に失敗しました');
    }

    if (!data) return [];

    const result = data.map((e) => ({
      name: e.name,
      userId: e.user_id,
    }));

    return result;
  } catch (er) {
    console.error(er);
    throw er;
  }
};

export { findUser, updateUser, usersRegisteredAsFavorites };
