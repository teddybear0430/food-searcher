import { FoodApiResult } from '~/types/api/foods';
import { QueryResolvers } from '~/types/type';

export const foods: QueryResolvers['foods'] = async (_, { keyword, lat, lng }) => {
  const API_TOKEN = process.env.API_TOKEN;

  let API_BASE_URL = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_TOKEN}&format=json&lat=${lat}&lng=${lng}&count=20`;
  if (keyword) {
    API_BASE_URL = `${API_BASE_URL}&keyword=${keyword}`;
  }

  try {
    const res = await fetch(API_BASE_URL);

    const json = (await res.json()) as FoodApiResult;
    const { shop, error } = json.results;

    // エラーの際でも、HTTPレスポンスステータスは常に "200 OK" が返却される仕様
    // https://webservice.recruit.co.jp/doc/hotpepper/reference.html
    if (!shop && error) {
      const { code } = error[0];
      if (code === 1000) {
        throw new Error('サーバで障害が発生しています');
      } else if (code === 2000) {
        throw new Error('APIキーまたはIPアドレスの認証エラー');
      } else {
        throw new Error('パラメータ不正エラーが発生しています');
      }
    }
    if (!shop) return [];

    const formattedResult = shop.map((item) => {
      const { address, genre, name, urls, card, lunch } = item;
      return {
        address,
        genre: genre.name,
        name,
        url: urls.pc,
        card,
        lunch,
      };
    });

    return formattedResult;
  } catch (er) {
    throw er;
  }
};
