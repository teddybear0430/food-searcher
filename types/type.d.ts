import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Food = {
  __typename?: 'Food';
  address: Scalars['String'];
  card: Scalars['String'];
  genre: Scalars['String'];
  lunch: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  uuid?: Maybe<Scalars['String']>;
};

export type MutateResponse = {
  __typename?: 'MutateResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavoriteShop: MutateResponse;
  createUser: MutateResponse;
  deleteFavoriteShop: MutateResponse;
  updateUser: MutateResponse;
};


export type MutationAddFavoriteShopArgs = {
  address: Scalars['String'];
  card: Scalars['String'];
  genre: Scalars['String'];
  id: Scalars['ID'];
  lunch: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationCreateUserArgs = {
  id: Scalars['ID'];
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationDeleteFavoriteShopArgs = {
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findUserById?: Maybe<UserByIdResult>;
  findUserByUserId?: Maybe<UserByUserIdResult>;
  foods: Array<Food>;
  usersRegisteredAsFavorites: Array<Maybe<UserIdAndUserName>>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByUserIdArgs = {
  userId: Scalars['String'];
};


export type QueryFoodsArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};


export type QueryUsersRegisteredAsFavoritesArgs = {
  name: Scalars['String'];
};

export type User = {
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UserByIdResult = User & {
  __typename?: 'UserByIdResult';
  favoriteShops: Array<Food>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type UserByIdResultFavoriteShopsArgs = {
  id: Scalars['ID'];
};

export type UserByUserIdResult = User & {
  __typename?: 'UserByUserIdResult';
  favoriteShops: Array<Food>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type UserByUserIdResultFavoriteShopsArgs = {
  userId: Scalars['String'];
};

export type UserIdAndUserName = {
  __typename?: 'UserIdAndUserName';
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Food: ResolverTypeWrapper<Food>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  MutateResponse: ResolverTypeWrapper<MutateResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolversTypes['UserByIdResult'] | ResolversTypes['UserByUserIdResult'];
  UserByIdResult: ResolverTypeWrapper<UserByIdResult>;
  UserByUserIdResult: ResolverTypeWrapper<UserByUserIdResult>;
  UserIdAndUserName: ResolverTypeWrapper<UserIdAndUserName>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Food: Food;
  ID: Scalars['ID'];
  MutateResponse: MutateResponse;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: ResolversParentTypes['UserByIdResult'] | ResolversParentTypes['UserByUserIdResult'];
  UserByIdResult: UserByIdResult;
  UserByUserIdResult: UserByUserIdResult;
  UserIdAndUserName: UserIdAndUserName;
};

export type FoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Food'] = ResolversParentTypes['Food']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  card?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lunch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  uuid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutateResponse'] = ResolversParentTypes['MutateResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFavoriteShop?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationAddFavoriteShopArgs, 'address' | 'card' | 'genre' | 'id' | 'lunch' | 'name' | 'url'>>;
  createUser?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'id' | 'userId'>>;
  deleteFavoriteShop?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationDeleteFavoriteShopArgs, 'id' | 'name'>>;
  updateUser?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findUserById?: Resolver<Maybe<ResolversTypes['UserByIdResult']>, ParentType, ContextType, RequireFields<QueryFindUserByIdArgs, 'id'>>;
  findUserByUserId?: Resolver<Maybe<ResolversTypes['UserByUserIdResult']>, ParentType, ContextType, RequireFields<QueryFindUserByUserIdArgs, 'userId'>>;
  foods?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType, RequireFields<QueryFoodsArgs, 'lat' | 'lng'>>;
  usersRegisteredAsFavorites?: Resolver<Array<Maybe<ResolversTypes['UserIdAndUserName']>>, ParentType, ContextType, RequireFields<QueryUsersRegisteredAsFavoritesArgs, 'name'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'UserByIdResult' | 'UserByUserIdResult', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type UserByIdResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserByIdResult'] = ResolversParentTypes['UserByIdResult']> = {
  favoriteShops?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType, RequireFields<UserByIdResultFavoriteShopsArgs, 'id'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserByUserIdResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserByUserIdResult'] = ResolversParentTypes['UserByUserIdResult']> = {
  favoriteShops?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType, RequireFields<UserByUserIdResultFavoriteShopsArgs, 'userId'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserIdAndUserNameResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserIdAndUserName'] = ResolversParentTypes['UserIdAndUserName']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Food?: FoodResolvers<ContextType>;
  MutateResponse?: MutateResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserByIdResult?: UserByIdResultResolvers<ContextType>;
  UserByUserIdResult?: UserByUserIdResultResolvers<ContextType>;
  UserIdAndUserName?: UserIdAndUserNameResolvers<ContextType>;
};

