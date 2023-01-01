// ホットペッパーのグルメサーチAPIの実行結果
// docs: https://webservice.recruit.co.jp/doc/hotpepper/reference.html
export type FoodApiResult = {
  results: {
    api_version: string;
    results_available?: number;
    results_returned?: string;
    results_start?: number;
    shop?: Shop[];
    error?: [
      {
        code: 1000 | 2000 | 3000;
        message: string;
      }
    ];
  };
};
type Shop = {
  address: string;
  desc: string;
  genre: {
    name: string;
  };
  id: string;
  name: string;
  name_kana: string;
  urls: {
    pc: string;
  };
  card: string;
  lunch: string;
};
