// ホットペッパーのグルメサーチAPIの実行結果
export type FoodApiResult = {
  results: {
    api_version: string;
    results_available: number;
    results_returned: string;
    results_start: number;
    shop: Shop[];
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
};
