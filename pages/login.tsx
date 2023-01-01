import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { AuthError, User } from '@supabase/supabase-js';
import { supabase } from '~/utils/supabaseClient';

const Login: NextPage = () => {
  const [user, setUser] = useState<User | null>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getUserInfo = async () => {
    const ses = await supabase.auth.getSession();
    return ses.data.session?.user;
  };

  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();
      if (userInfo) setUser(userInfo);
    })();
  }, [user]);

  const handleLogin = async () => {
    try {
      const { data } = await supabase.auth.signUp({ email, password });
      const { data: result, error } = await supabase.rpc('create_user', { uuid: data.user?.id, name: name });
      console.log(result);
      console.log(error);

      alert('Check your email for the login link!');
      setUser(data.user);
    } catch (error) {
      if (error instanceof AuthError) {
        alert(error.message);
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
  };

  return (
    <>
      <h1>サインアップ</h1>
      <div>
        <input
          className="inputField"
          type="text"
          placeholder="ユーザー名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          className="inputField"
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          className="inputField"
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {user ? (
        <div>
          <strong>{user.id}</strong>
          <br />
          <strong>{user.email}</strong>
          <button onClick={signOut}>ログアウト</button>
        </div>
      ) : (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            登録
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
