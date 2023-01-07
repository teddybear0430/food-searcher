import { addFavoriteShop, deleteFavoriteShop } from './favoriteShop';
import { foods } from './foods';
import { findUserById, findUserByUserId, updateUser, usersRegisteredAsFavorites } from './user';

export const resolvers = {
  Query: {
    foods,
    findUserById,
    findUserByUserId,
    usersRegisteredAsFavorites,
  },
  Mutation: {
    updateUser,
    addFavoriteShop,
    deleteFavoriteShop,
  },
};
