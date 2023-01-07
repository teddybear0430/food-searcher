import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Food {
    uuid: String
    address: String!
    genre: String!
    name: String!
    url: String!
    card: String!
    lunch: String!
  }

  interface User {
    id: ID!
    name: String
    userId: String!
    location: String
    profile: String
  }
  type UserByIdResult implements User {
    id: ID!
    name: String
    userId: String!
    location: String
    profile: String
    favoriteShops(id: ID!): [Food!]!
  }
  type UserByUserIdResult implements User {
    id: ID!
    name: String
    userId: String!
    location: String
    profile: String
    favoriteShops(userId: String!): [Food!]!
  }

  type UserIdAndUserName {
    name: String
    userId: String
  }

  type Query {
    # 位置情報を元に近所の飲食店を取得
    foods(lat: Float!, lng: Float!, keyword: String): [Food!]!

    # ユーザー情報の取得
    findUserById(id: ID!): UserByIdResult
    findUserByUserId(userId: String!): UserByUserIdResult

    # お気に入りに登録したユーザーの情報を取得する
    usersRegisteredAsFavorites(name: String!): [UserIdAndUserName]!
  }

  type MutateResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    # ユーザー情報の新規作成
    createUser(id: ID!, userId: String!, name: String, location: String, profile: String): MutateResponse!

    # ユーザー情報の更新
    updateUser(id: ID!, userId: String, name: String, location: String, profile: String): MutateResponse!

    # 検索した店舗をお気に入りに登録する
    addFavoriteShop(
      id: ID!
      address: String!
      genre: String!
      name: String!
      url: String!
      card: String!
      lunch: String!
    ): MutateResponse!

    # お気に入りに登録した店舗を削除する
    deleteFavoriteShop(id: ID!, name: String!): MutateResponse!
  }
`;
