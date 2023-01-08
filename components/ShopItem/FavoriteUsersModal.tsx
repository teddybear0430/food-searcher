import { gql } from 'graphql-request';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useSWR from 'swr';
import { Query, QueryUsersRegisteredAsFavoritesArgs } from '~/types/type';
import { client } from '~/utils/graphqlClient';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  name: string;
};

const FavoriteUsersModal: FC<Props> = ({ isOpen, setIsOpen, name }) => {
  const closeModal = () => setIsOpen(false);

  const query = gql`
    query ($name: String!) {
      usersRegisteredAsFavorites(name: $name) {
        userId
        name
      }
    }
  `;
  const params: QueryUsersRegisteredAsFavoritesArgs = {
    name,
  };
  const { data, error } = useSWR<Query>(['favorites', name], () => client().request(query, params));

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
                  <Dialog.Title as="h2" className="text-xl font-bold leading-6 text-gray-900 mb-2 w-4/5">
                    {name}
                    <br />
                  </Dialog.Title>
                  <Dialog.Description as="h3" className="font-bold mb-2">
                    お気に入りに登録したユーザー
                  </Dialog.Description>
                  {error && <p className="text-red-600 font-bold">お気に入りユーザーの登録に失敗しました</p>}
                  {data?.usersRegisteredAsFavorites && (
                    <>
                      {data.usersRegisteredAsFavorites.length == 0 ? (
                        <p>お気に入りに登録しているユーザーはいません</p>
                      ) : (
                        <div className="h-52 overflow-y-scroll">
                          <ul>
                            {data?.usersRegisteredAsFavorites.map((item) => (
                              <li key={item?.userId}>
                                <Link href={`/user/${item?.userId}`} className="text-blue-700 hover:underline">
                                  {item?.name ? item.name : item?.userId}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FavoriteUsersModal;
