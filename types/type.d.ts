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
};

export type MutateResponse = {
  __typename?: 'MutateResponse';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavoriteShop: MutateResponse;
  deleteFavoriteShop: MutateResponse;
  updateUser: MutateResponse;
};


export type MutationAddFavoriteShopArgs = {
  address: Scalars['String'];
  card: Scalars['String'];
  genre: Scalars['String'];
  lunch: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationDeleteFavoriteShopArgs = {
  name: Scalars['String'];
  uuid: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  favoriteShops: Array<Food>;
  findUser?: Maybe<User>;
  foods: Array<Food>;
};


export type QueryFavoriteShopsArgs = {
  uuid: Scalars['String'];
};


export type QueryFindUserArgs = {
  uuid: Scalars['String'];
};


export type QueryFoodsArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profile?: Maybe<Scalars['String']>;
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
  MutateResponse: ResolverTypeWrapper<MutateResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Food: Food;
  MutateResponse: MutateResponse;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: User;
};

export type FoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Food'] = ResolversParentTypes['Food']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  card?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lunch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutateResponse'] = ResolversParentTypes['MutateResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFavoriteShop?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationAddFavoriteShopArgs, 'address' | 'card' | 'genre' | 'lunch' | 'name' | 'url' | 'uuid'>>;
  deleteFavoriteShop?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationDeleteFavoriteShopArgs, 'name' | 'uuid'>>;
  updateUser?: Resolver<ResolversTypes['MutateResponse'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'uuid'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  favoriteShops?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType, RequireFields<QueryFavoriteShopsArgs, 'uuid'>>;
  findUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryFindUserArgs, 'uuid'>>;
  foods?: Resolver<Array<ResolversTypes['Food']>, ParentType, ContextType, RequireFields<QueryFoodsArgs, 'lat' | 'lng'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Food?: FoodResolvers<ContextType>;
  MutateResponse?: MutateResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

