import { addFavoriteShop, deleteFavoriteShop } from './favoriteShop';
import { shops } from './shops';
import { findUserById, findUserByUserId, createUser, updateUser, usersRegisteredAsFavorites } from './user';

export const resolvers = {
  Query: {
    shops,
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
