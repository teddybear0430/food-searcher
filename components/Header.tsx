import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthModal from '~/components/AuthModal';
import { useAuthStore } from '~/stores/useAuthStore';
import { supabase } from '~/utils/supabaseClient';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<'signup' | 'signin'>('signup');

  const [auth, setAuth] = useAuthStore();

  const router = useRouter();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw Error;

      if (router.asPath === '/mypage') router.push('/');

      setAuth({
        uuid: '',
        token: '',
        isLoggedin: false,
      });
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <>
      <header className="px-4 backdrop-blur bg-white/60 shadow-lg border-b fixed  top-0 left-0 w-full z-10">
        <div className="flex justify-between items-center mx-auto w-11/12 lg:w-7/12 h-14">
          <h1 className="inline-block lg:w-60">
            <Link href="/">今日なにたべて生きてこ</Link>
          </h1>
          {auth.isLoggedin !== null && (
            <ul className="flex">
              {!auth.isLoggedin && (
                <>
                  <li
                    className="mx-2 cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      setModalType('signin');
                    }}
                  >
                    ログイン
                  </li>
                  <li
                    className="mx-2 cursor-pointer"
                    onClick={() => {
                      setIsOpen(true);
                      setModalType('signup');
                    }}
                  >
                    登録
                  </li>
                </>
              )}
              {auth.isLoggedin && (
                <>
                  <li className="mx-2 cursor-pointer">
                    <Link href="/mypage">マイページ</Link>
                  </li>
                  <li className="mx-2 cursor-pointer" onClick={signOut}>
                    ログアウト
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </header>
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} type={modalType} />
    </>
  );
};

export default Header;
