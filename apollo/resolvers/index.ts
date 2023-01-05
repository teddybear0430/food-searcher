import { foods } from './foods';
import { findUserById, findUserByUserId, updateUser, usersRegisteredAsFavorites } from './user';
import { addFavoriteShop, deleteFavoriteShop } from './favoriteShop';

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
