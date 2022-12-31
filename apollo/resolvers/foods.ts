import { FoodApiResult } from '~/types/api/foods';
import { QueryResolvers } from '~/types/type';

export const getFoods: QueryResolvers['foods'] = async (_, { keyword }) => {
  const API_TOKEN = process.env.API_TOKEN;
  const url = `https://webservice.recruit.co.jp/hotpepper/shop/v1/?key=${API_TOKEN}&keyword=${keyword}&count=50&format=json`;

  const res = await fetch(url);
  const json = (await res.json()) as FoodApiResult;

  const formattedResult = json.results.shop.map((item) => {
    return {
      address: item.address,
      genreName: item.genre.name,
      name: item.name,
      url: item.urls.pc,
    };
  });

  return formattedResult;
};
