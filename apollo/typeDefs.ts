import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Food {
    address: String!
    genre: String!
    name: String!
    url: String!
    card: String!
    lunch: String!
  }

  type User {
    name: String
    userId: String
    location: String
    profile: String
  }

  type UserIdAndUserName {
    name: String
    userId: String
  }

  type Query {
    # 位置情報を元に近所の飲食店を取得
    foods(lat: Float!, lng: Float!, keyword: String): [Food!]!

    # ユーザー情報の取得
    # uuidかユーザー作成時に発行されるユーザーIDいずれかで検索できるようにする
    findUser(id: ID, userId: String): User

    # ユーザーがお気に入りに追加した店舗の情報を取得する
    favoriteShops(id: String!): [Food!]!

    # お気に入りに登録したユーザーの情報を取得する
    usersRegisteredAsFavorites(name: String!): [UserIdAndUserName]!
  }

  type MutateResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    # ユーザー情報の更新
    updateUser(id: String!, userId: String, name: String, location: String, profile: String): MutateResponse!

    # 検索した店舗をお気に入りに登録する
    addFavoriteShop(
      uuid: String!
      address: String!
      genre: String!
      name: String!
      url: String!
      card: String!
      lunch: String!
    ): MutateResponse!

    # お気に入りに登録した店舗を削除する
    deleteFavoriteShop(id: String!, name: String!): MutateResponse!
  }
`;
