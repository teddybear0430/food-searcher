import { FC, ReactChild, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  children: ReactChild;
};

const AuthenticationProvider: FC<Props> = ({ children }) => {
  const [_, setAuth] = useAuthStore();

  // 認証状態に応じてStateの切り替えを行う
  const handleSession = (session: Session | null) => {
    if (session !== null) {
      setAuth({
        uuid: session.user.id,
        isLoggedin: true,
      });
    } else {
      setAuth({
        uuid: '',
        isLoggedin: false,
      });
    }
  };

  useEffect(() => {
    authCheck();

    // 認証イベントが発生するたびに発火する処理
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      handleSession(session);
    });

    return () => {
      data.subscription.unsubscribe;
    };
  }, []);

  // 認証中かどうかのチェック
  const authCheck = async () => {
    const { session } = (await supabase.auth.getSession()).data;
    handleSession(session);
  };

  return <>{children}</>;
};

export default AuthenticationProvider;
