import type { NextPage } from 'next';
import Seo from '~/components/Seo';

const Custom404: NextPage = () => {
  return (
    <>
      <Seo />
      <p className="font-bold text-3xl">404 Not Found</p>
    </>
  );
};

export default Custom404;
