import useSWR, { Key } from 'swr';

/**
 * SWRでグローバルステートを保持するためのカスタムフック
 */
export const useStaticSWR = <State>(key: Key, initialState?: State) => {
  // 第2引数にnullを渡すとデータのフェッチを行わないようにできる
  const { data: state, mutate: setState } = useSWR(key, null, {
    // 初期値
    fallbackData: initialState,
    // ウィンドウがフォーカスされたときに自動的に再検証しないようにする
    revalidateOnFocus: false,
    // ブラウザがネットワーク接続を回復すると自動的に再検証しないようにする
    revalidateOnReconnect: false,
  });

  // stateがundefinedの可能性もミューテーションがPromiseを返却する可能性もないので、
  // 型キャストを使用する
  return [state, setState] as [State, (value: State) => void];
};
