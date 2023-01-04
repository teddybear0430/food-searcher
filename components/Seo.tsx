import React from 'react';
import Head from 'next/head';
import { app } from '~/constants/app';

type Props = {
  title?: string;
  description?: string;
};

const Seo: React.FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title ? `${title}｜${app.name}` : `${app.name}`}</title>
      <meta
        name="description"
        content={description ? `${description}` : '位置情報を元に近所の飲食店を検索できるアプリケーションです。'}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
