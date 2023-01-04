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
    location: String
    profile: String
  }

  type Query {
    # 位置情報を元に近所の飲食店を取得
    foods(lat: Float!, lng: Float!, keyword: String): [Food!]!

    # ユーザー情報の取得
    findUser(uuid: String!): User

    # ユーザーがお気に入りに追加した店舗の情報を取得する
    favoriteShops(uuid: String!): [Food!]!
  }

  type MutateResponse {
    success: Boolean!
    message: String!
  }

  type Mutation {
    # ユーザー情報の更新
    updateUser(uuid: String!, name: String, location: String, profile: String): MutateResponse!

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
    deleteFavoriteShop(uuid: String!, name: String!): MutateResponse!
  }
`;
