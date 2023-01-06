import { gql } from 'graphql-request';
import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '~/components/Button';
import TextField from '~/components/TextField';
import { useAuthStore } from '~/stores/useAuthStore';
import { MutateResponse, MutationCreateUserArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';
import { supabase } from '~/utils/supabaseClient';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  type?: 'signup' | 'signin';
};
type FormData = {
  email: string;
  password: string;
};

const SignupModal: FC<Props> = ({ isOpen, setIsOpen, type = 'signup' }) => {
  // バリデーションの設定
  const {
    handleSubmit,
    register,
    // isDirty: 全体で何かしら変更があったらtrueになる
    // isValid: 何かしらエラーがあったらtrue (modeがonChange or onBlurの時のみ)
    formState: { isDirty, isValid },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const closeModal = () => setIsOpen(false);
  const [_, setAuth] = useAuthStore();

  // 登録
  const handleSignUp = async (email: string, password: string) => {
    try {
      const { data: userData, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        setErrorMessage(
          'アカウントの作成に失敗しました。\nメールアドレスとパスワードが既に使用されている可能性があるので、再度ご確認ください。'
        );
        return;
      }

      // TODO
      // ここで失敗したら、既に作成したユーザーを削除するみたいなトランザクション処理的なことをやりたい
      const mutation = gql`
        mutation ($id: ID!) {
          createUser(id: $id) {
            success
            message
          }
        }
      `;
      const params: MutationCreateUserArgs = {
        id: userData.user?.id || '',
      };
      const res = await client(userData.session?.access_token).request<{ createUser: MutateResponse }>(
        mutation,
        params
      );

      if (!res.createUser.success) {
        setAuth({
          uuid: '',
          isLoggedin: false,
        });
        setErrorMessage('アカウントの作成に失敗しました。');
        return;
      }

      reset({
        email: '',
        password: '',
      });

      closeModal();
    } catch (er) {
      console.error(er);
    }
  };

  // ログイン
  const handleSignIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage(`ログインに失敗しました。\nメールアドレスとパスワードを確認してください。`);
        return;
      }

      reset({
        email: '',
        password: '',
      });

      closeModal();
    } catch (er) {
      console.error(er);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, password } = data;

    if (type === 'signup') {
      await handleSignUp(email, password);
    } else {
      await handleSignIn(email, password);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button className="absolute top-3 right-3 text-3xl" onClick={closeModal}>
                  <AiOutlineClose />
                </button>
                <div className="mb-6">
                  <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center mb-2">
                    {type === 'signup' && <>会員登録</>}
                    {type === 'signin' && <>ログイン</>}
                  </Dialog.Title>
                  <Dialog.Description as="p">メールアドレスとパスワードを入力してください。</Dialog.Description>
                  {type === 'signup' && (
                    <p>
                      パスワードは<span className="text-red-600 font-bold">半角全角英数字全てを含む10文字以上</span>
                      になるように設定してください。
                    </p>
                  )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    inputLabel="メールアドレス"
                    id="email"
                    name="email"
                    type="email"
                    register={register('email', {
                      required: true,
                      pattern: {
                        value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                        message: 'メールアドレスかどうかのチェック',
                      },
                    })}
                  />
                  <TextField
                    inputLabel="パスワード"
                    id="password"
                    name="password"
                    type="password"
                    register={register('password', {
                      required: true,
                      pattern: {
                        value: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{10,}$/,
                        message: '半角全角英数字のいずれかを含む10文字以上',
                      },
                    })}
                  />
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-600 font-bold whitespace-pre-wrap">{errorMessage}</p>
                  )}
                  <div className="mt-6 text-center">
                    {type === 'signup' && (
                      <Button theme="primary" type="submit" disabled={!isDirty || !isValid}>
                        登録する
                      </Button>
                    )}
                    {type === 'signin' && (
                      <Button theme="primary" type="submit" disabled={!isDirty || !isValid}>
                        ログイン
                      </Button>
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignupModal;
