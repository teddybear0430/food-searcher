import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '~/components/Button';
import Seo from '~/components/Seo';
import TextField from '~/components/TextField';
import { useGeolocated } from '~/hooks/useGeolocated';

const Home: NextPage = () => {
  const router = useRouter();
  const { isAvailable } = useGeolocated();

  const [keyword, setKeyword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClick = () => {
    router.push({
      pathname: '/search',
      ...(keyword ? { query: { keyword } } : {}),
    });
  };

  return (
    <>
      <Seo />
      {isAvailable && (
        <section className="my-6">
          <h1 className="text-3xl font-bold text-center mb-2">現在の位置情報の近くにある飲食店を検索しよう</h1>
          <div className="text-center">
            <Button theme="secondly" onClick={handleClick} disabled={!isAvailable}>
              検索
            </Button>
          </div>
          <TextField
            inputLabel="キーワード"
            id="keyword"
            name="keyword"
            type="text"
            placeholder="キーワードを入力することもできます"
            value={keyword}
            onChange={handleChange}
          />
        </section>
      )}
      <section className="my-6">
        <h2 className="text-2xl">今日なに食べて生きてことは？</h2>
        <p>
          お腹は減っているけど、何を食べたいのかよくわからない...
          <br />
          そんなことありませんか？
        </p>
        <ul>
          <li>今いる場所の近くの飲食店を検索することができます</li>
          <li>キーワードなどの条件を加えて検索することもできます</li>
          <li>検索した飲食店をお気に入りに登録したり、TwitterやLineなどで共有することができます</li>
        </ul>
      </section>
      <section className="my-6">
        <h2 className="text-2xl">こんな時に使うと便利かも！？</h2>
        <ul>
          <li>お腹は空いているけど何が食べたいかよくわからない時</li>
          <li>初めて行く場所でどんな飲食店があるか探して見たい時</li>
        </ul>
      </section>
    </>
  );
};

export default Home;
