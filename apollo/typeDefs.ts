import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Shop {
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
    favoriteShops(id: ID!): [Shop!]!
  }
  type UserByUserIdResult implements User {
    id: ID!
    name: String
    userId: String!
    location: String
    profile: String
    favoriteShops(userId: String!): [Shop!]!
  }

  type UserIdAndUserName {
    name: String
    userId: String
  }

  type Query {
    # 位置情報を元に近所の飲食店を取得
    shops(lat: Float!, lng: Float!, keyword: String): [Shop!]!

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

  input userInput {
    id: ID!
    userId: String!
    name: String
    location: String
    profile: String
  }

  input shopInput {
    id: ID!
    address: String!
    genre: String!
    name: String!
    url: String!
    card: String!
    lunch: String!
  }

  type Mutation {
    # ユーザー情報の新規作成
    createUser(input: userInput!): MutateResponse!

    # ユーザー情報の更新
    updateUser(input: userInput!): MutateResponse!

    # 検索した店舗をお気に入りに登録する
    addFavoriteShop(input: shopInput!): MutateResponse!

    # お気に入りに登録した店舗を削除する
    deleteFavoriteShop(id: ID!, name: String!): MutateResponse!
  }
`;
