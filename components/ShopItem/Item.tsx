import { FC } from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { Item } from '~/types/shop';
import { useShopItem } from '~/hooks/useShopItem';
import Label from './Label';

type Props = {
  item: Item;
  favoriteShops: Item[];
};

const ShopItem: FC<Props> = ({ item, favoriteShops = [] }) => {
  // 表示されている店舗がお気に入りに追加されているかチェックする
  const isFavoritedCheck = () => {
    if (favoriteShops.length === 0) return false;
    return Boolean(favoriteShops.find((e) => e.name === item.name));
  };

  const { isFavorite, auth, addFavoriteShop, deleteFavoriteShop } = useShopItem(isFavoritedCheck());

  const handleFavorite = async (item: Item) => {
    if (!isFavorite) {
      await addFavoriteShop(item);
    } else {
      await deleteFavoriteShop(item);
    }
  };

  const { name, address, genre, lunch, card } = item;

  return (
    <li key={name} className="my-4 p-4 rounded-lg shadow">
      <div className="flex justify-between">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
          {item.name}
        </a>
        <div className="flex flex-col items-center">
          {auth.token && (
            <>
              {favoriteShops.find((e) => e.name === item.name) ? (
                <button
                  className={`text-2xl ${
                    isFavorite ? 'text-red-500 hover:text-red-300' : 'text-gray-300 hover:text-gray-300'
                  }`}
                  onClick={() => handleFavorite(item)}
                >
                  {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
              ) : (
                <button
                  className={`text-2xl ${
                    !isFavorite ? 'text-gray-300 hover:text-gray-500' : 'text-red-500 hover:text-red-500'
                  }`}
                  onClick={() => handleFavorite(item)}
                >
                  {!isFavorite ? <AiOutlineHeart /> : <AiFillHeart />}
                </button>
              )}
            </>
          )}
          <Link href={`/favorites/${item.name}`} className="text-xl mt-2 text-gray-300 hover:text-gray-500">
            <BsFillBookmarksFill />
          </Link>
        </div>
      </div>
      <p>住所: {address}</p>
      <div className="flex mt-2">
        <p className="mr-2">
          <Label>ジャンル</Label>
          <span className="pl-2">{genre}</span>
        </p>
        <p className="mr-2">
          <Label bg="bg-yellow-500">ランチ</Label>
          <span className="pl-2">{lunch}</span>
        </p>
        <p>
          <Label bg="bg-green-500">カードの利用</Label>
          <span className="pl-2">{card}</span>
        </p>
      </div>
    </li>
  );
};

export default ShopItem;
