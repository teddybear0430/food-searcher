import { foods } from './foods';
import { findUser, updateUser } from './user';

export const resolvers = {
  Query: {
    foods,
    findUser,
  },
  Mutation: {
    updateUser,
  },
};
