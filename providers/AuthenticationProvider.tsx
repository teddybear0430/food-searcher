import { FC, ReactChild, useEffect } from 'react';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  children: ReactChild;
};

const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [_, setAuth] = useAuthStore();

  // 認証状態に応じてグローバルステートの切り替えを行う
  const handleSession = (session: Session | null) => {
    if (session !== null) {
      setAuth({
        token: session.access_token,
        isLoggedin: true,
      });
    } else {
      setAuth({
        token: '',
        isLoggedin: false,
      });
    }
  };

  // 認証中かどうかのチェック
  const authCheck = async () => {
    const { session } = (await supabase.auth.getSession()).data;
    handleSession(session);
  };

  // セッション情報からアクセストークンとリフレッシュ トークンを取得してクッキーの更新処理を行う
  // SSRを行うときに必要になる処理
  // 参考: https://supabase.com/docs/guides/auth/server-side-rendering
  const SetCookie = (event: AuthChangeEvent, session: Session | null) => {
    if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
      // delete cookies on sign out
      const expires = new Date(0).toUTCString();
      document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
      const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
      document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    }
  };

  useEffect(() => {
    authCheck();

    // 認証イベントが発生するたびに発火する処理
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      handleSession(session);
      SetCookie(event, session);
    });

    return () => {
      data.subscription.unsubscribe;
    };
  }, []);

  return <>{children}</>;
};

export default AuthenticationProvider;
