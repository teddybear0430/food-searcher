import { MutationResolvers, QueryResolvers } from '~/types/type';
import { supabase } from '~/utils/supabaseClient';

const findUser: QueryResolvers['findUser'] = async (_, { uuid }) => {
  try {
    const { data, error } = await supabase.from('users').select('name, location, profile').eq('uuid', uuid).single();

    if (error) {
      throw new Error('ユーザー情報の取得を行う際にエラーが発生しました');
    }

    const { name, location, profile } = data;

    return {
      name,
      location,
      profile,
    };
  } catch (er) {
    console.error(er);
    throw er;
  }
};

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

  const { uuid, name, location, profile } = args;

  try {
    // 更新対象のユーザー情報の取得と存在チェック
    const { data: findUserData, error: findUserError } = await supabase
      .from('users')
      .select()
      .eq('uuid', uuid)
      .single();
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
      .update({ name, location, profile })
      .eq('uuid', uuid);

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

export { findUser, updateUser };
