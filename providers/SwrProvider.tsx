import { SWRConfig } from 'swr';
import { FC, ReactChild } from 'react';

type Props = {
  children: ReactChild;
};

const SwrProvider: FC<Props> = ({ children }) => {
  // デフォルトではウィンドウがフォーカスされたときにデータの再取得を行う仕様になっているので無効にする
  return <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>;
};

export default SwrProvider;
