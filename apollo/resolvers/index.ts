import { foods } from './foods';
import { findUser, updateUser } from './user';
import { favoriteShops, addFavoriteShop, deleteFavoriteShop } from './favoriteShop';

export const resolvers = {
  Query: {
    foods,
    findUser,
    favoriteShops,
  },
  Mutation: {
    updateUser,
    addFavoriteShop,
    deleteFavoriteShop,
  },
};
