import { addFavoriteShop, deleteFavoriteShop } from './favoriteShop';
import { foods } from './foods';
import { findUserById, findUserByUserId, createUser, updateUser, usersRegisteredAsFavorites } from './user';

export const resolvers = {
  Query: {
    foods,
    findUserById,
    findUserByUserId,
    usersRegisteredAsFavorites,
  },
  Mutation: {
    createUser,
    updateUser,
    addFavoriteShop,
    deleteFavoriteShop,
  },
};
