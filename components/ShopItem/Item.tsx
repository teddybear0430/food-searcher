import { FC } from 'react';
import { Query } from '~/types/type';
import Label from './Label';

type Props = {
  item: Query['foods'][0];
};

const ShopItem: FC<Props> = ({ item }) => {
  const { name, address, genreName, lunch, card } = item;
  return (
    <li key={name} className="my-4 p-4 rounded-lg shadow">
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
        {item.name}
      </a>
      <p>住所: {address}</p>
      <div className="flex mt-2">
        <p className="mr-2">
          <Label>ジャンル</Label>
          <span className="pl-2">{genreName}</span>
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
