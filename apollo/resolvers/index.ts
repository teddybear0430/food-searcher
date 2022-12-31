import { getFoods } from './foods';

export const resolvers = {
  Query: {
    foods: getFoods,
  },
};
