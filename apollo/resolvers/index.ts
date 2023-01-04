import { foods } from './foods';
import { findUser, updateUser, usersRegisteredAsFavorites } from './user';
import { favoriteShops, addFavoriteShop, deleteFavoriteShop } from './favoriteShop';

export const resolvers = {
  Query: {
    foods,
    findUser,
    favoriteShops,
    usersRegisteredAsFavorites,
  },
  Mutation: {
    updateUser,
    addFavoriteShop,
    deleteFavoriteShop,
  },
};
