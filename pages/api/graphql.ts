import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '~/apollo/typeDefs';
import { resolvers } from '~/apollo/resolvers/index';
import { supabase } from '~/utils/supabaseClient';

const server = new ApolloServer({
  resolvers,
  typeDefs,
  // デフォルトのランディングページを無効にする
  plugins: [ApolloServerPluginLandingPageDisabled()],
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, _) => {
    // headerに追記したjwt tokenを使ってuser情報の取得と検証を実施する
    const { authorization } = req.headers;

    if (!authorization) {
      return {
        user: null,
      };
    }

    const token = authorization.split(' ')[1];
    const { data } = await supabase.auth.getUser(token);
    const { user } = data;

    // バックエンドで認証済みのユーザーのuuidを取得できるようにする
    return {
      currentUserId: user?.id,
    };
  },
});
