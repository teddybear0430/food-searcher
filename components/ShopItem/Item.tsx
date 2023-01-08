import { FC, useState } from 'react';
import { AiOutlineHeart, AiFillHeart, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { FaLine } from 'react-icons/fa';
import { useShopItem } from '~/hooks/useShopItem';
import { Item } from '~/types/shop';
import Label from './Label';
import FavoriteUsersModal from './FavoriteUsersModal';

type Props = {
  item: Item;
  favoriteShops: Item[];
  isLoggedin: boolean;
  userId?: string;
};

const ShopItem: FC<Props> = ({ item, favoriteShops = [], isLoggedin, userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 表示されている店舗がお気に入りに追加されているかチェックする
  const isFavoritedCheck = () => {
    if (favoriteShops.length === 0) return false;
    return Boolean(favoriteShops.find((e) => e.name === item.name));
  };

  const { isFavorite, addFavoriteShop, deleteFavoriteShop } = useShopItem(isFavoritedCheck(), userId);

  const handleFavorite = async (item: Item) => {
    if (!isFavorite) {
      await addFavoriteShop(item);
    } else {
      await deleteFavoriteShop(item);
    }
  };

  const { name, url, address, genre, lunch, card } = item;

  return (
    <li key={name} className="relative mb-4 p-4 rounded-lg shadow">
      <div className="absolute top-3 right-3 flex flex-col items-center">
        {isLoggedin && (
          <>
            {favoriteShops.find((e) => e.name === name) ? (
              <button
                className={`text-2xl mb-1 ${
                  isFavorite ? 'text-red-500 hover:text-red-300' : 'text-gray-300 hover:text-gray-300'
                }`}
                onClick={() => handleFavorite(item)}
              >
                {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
              </button>
            ) : (
              <button
                className={`text-2xl mb-1 ${
                  !isFavorite ? 'text-gray-300 hover:text-gray-500' : 'text-red-500 hover:text-red-500'
                }`}
                onClick={() => handleFavorite(item)}
              >
                {!isFavorite ? <AiOutlineHeart /> : <AiFillHeart />}
              </button>
            )}
          </>
        )}
        <button className="text-xl text-gray-300 hover:text-gray-500" onClick={() => setIsOpen(true)}>
          <BsFillBookmarksFill />
        </button>
      </div>
      <div className="lg:w-full w-10/12">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
          {name}
        </a>
        <p>住所: {address}</p>
      </div>
      <div className="lg:flex block my-2">
        <p className="lg:m-0 mb-1 flex items-center">
          <Label>ジャンル</Label>
          <span className="px-2">{genre}</span>
        </p>
        <p className="lg:m-0 mb-1 flex items-center">
          <Label bg="bg-yellow-500">ランチ</Label>
          <span className="px-2">{lunch}</span>
        </p>
        <p className="lg:m-0 mb-1 flex items-center">
          <Label bg="bg-green-500">カードの利用</Label>
          <span className="px-2">{card}</span>
        </p>
      </div>
      <div className="flex text-3xl">
        <a
          href={`//twitter.com/intent/tweet?url=${url}&text=`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-blue-500"
        >
          <AiFillTwitterCircle />
        </a>
        <a
          href={`//timeline.line.me/social-plugin/share?url=${url}&text=`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-green-500"
        >
          <FaLine />
        </a>
      </div>
      <FavoriteUsersModal isOpen={isOpen} setIsOpen={setIsOpen} name={item.name} />
    </li>
  );
};

export default ShopItem;
