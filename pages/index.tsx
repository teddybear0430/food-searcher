import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import Button from '~/components/Button';
import Seo from '~/components/Seo';
import TextField from '~/components/TextField';
import { useGeolocated } from '~/hooks/useGeolocated';

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/search',
      ...(keyword ? { query: { keyword } } : {}),
    });
  };

  const { isAvailable } = useGeolocated();

  return (
    <>
      <Seo />
      <section className="mb-12 py-16 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mr-[calc(50%-50vw)] ml-[calc(50%-50vw)] text-center text-white mt-[-32px]">
        <strong className="text-2xl">
          お腹はすいているけど、何を食べたいのかよくわからない...
          <br />
          そんなことありませんか？
        </strong>
      </section>
      {isAvailable && (
        <section className="my-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1 className="text-3xl font-bold text-center mb-2">あなたの近くにある飲食店を探してみよう</h1>
            <div className="text-center">
              <Button theme="secondly" onClick={handleClick} disabled={!isAvailable}>
                検索
              </Button>
            </div>
            <TextField
              inputLabel="キーワードから探す"
              id="keyword"
              name="keyword"
              type="text"
              placeholder="キーワードを入力する"
              value={keyword}
              onChange={handleChange}
            />
          </form>
        </section>
      )}
      <section className="my-6">
        <h2 className="text-2xl mb-2">今日なにたべて生きてこができること</h2>
        <ul className="list-disc mb-4 ml-5">
          <li>今いる場所の近く（1km圏内）の飲食店をすぐに検索することができます</li>
          <li>キーワードなどの条件を加えて検索することもできます</li>
          <li>TwitterやLINEで検索した飲食店を共有することができます</li>
          <li>検索した飲食店をお気に入りに登録することができます</li>
        </ul>
      </section>
      <section className="my-6">
        <h2 className="text-2xl mb-2">こんな時に使ってみると便利かも?</h2>
        <ul className="list-disc mb-4 ml-5">
          <li>お腹は空いているけど何が食べたいかよくわからない時</li>
          <li>初めて行く場所でどんな飲食店があるか探して見たい時</li>
        </ul>
      </section>
      <section className="my-6">
        <h2 className="text-2xl mb-2">お問い合わせ</h2>
        <p>開発者のTwitterまでご連絡ください。</p>
        <a
          href="https://twitter.com/karukichi_yah"
          rel="nofollow noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          @karukichi_yah
        </a>
      </section>
    </>
  );
};

export default Home;
