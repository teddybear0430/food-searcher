import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { BsHouseDoorFill, BsPersonCheck } from 'react-icons/bs';
import { GoSignOut, GoSignIn } from 'react-icons/go';
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
        isLoggedin: false,
      });
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <>
      <header className="px-2 backdrop-blur bg-white/60 shadow-lg border-b fixed top-0 left-0 w-full z-10 h-16">
        <div className="flex justify-between items-center w-11/12 lg:w-7/12 h-full mx-auto">
          <h1 className="font-logo sm:w-auto w-32">
            <Link href="/">今日なにたべて生きてこ</Link>
          </h1>
          {auth.isLoggedin !== null && (
            <ul className="flex text-sm">
              {!auth.isLoggedin && (
                <>
                  <li className="sm:mx-2 mx-1">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setModalType('signin');
                      }}
                      className="flex flex-col items-center text-xl"
                    >
                      <GoSignIn />
                      <span className="text-sm">ログイン</span>
                    </button>
                  </li>
                  <li className="sm:mx-2 mx-1">
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setModalType('signup');
                      }}
                      className="flex flex-col items-center text-xl"
                    >
                      <BsPersonCheck />
                      <span className="text-sm">登録</span>
                    </button>
                  </li>
                </>
              )}
              {auth.isLoggedin && (
                <>
                  <li className="sm:mx-2 mx-1">
                    <Link href="/mypage" className="flex flex-col items-center text-xl">
                      <BsHouseDoorFill />
                      <span className="sm:text-sm text-xs">マイページ</span>
                    </Link>
                  </li>
                  <li className="sm:mx-2 mx-1">
                    <button onClick={signOut} className="flex flex-col items-center text-xl">
                      <GoSignOut />
                      <span className="sm:text-sm text-xs">ログアウト</span>
                    </button>
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
