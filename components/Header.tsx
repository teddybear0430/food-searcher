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
        token: '',
        isLoggedin: false,
      });
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <>
      <header className="p-3 backdrop-blur bg-white/60 shadow-lg border-b fixed top-0 left-0 w-full z-10">
        <div className="flex justify-between items-center">
          <h1 className="inline-block lg:w-60">
            <Link href="/">今日なにたべて生きてこ</Link>
          </h1>
          {auth.isLoggedin !== null && (
            <ul className="flex text-sm">
              {!auth.isLoggedin && (
                <>
                  <li className="mx-2">
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
                  <li className="mx-2">
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
                  <li className="mx-2">
                    <Link href="/mypage" className="flex flex-col items-center text-xl">
                      <BsHouseDoorFill />
                      <span className="text-sm">マイページ</span>
                    </Link>
                  </li>
                  <li className="mx-2">
                    <button onClick={signOut} className="flex flex-col items-center text-xl">
                      <GoSignOut />
                      <span className="text-sm">ログアウト</span>
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
