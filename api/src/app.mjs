import ApolloServer from 'apollo-server';
import on from 'await-on';

import { generateModels, instance } from './models';
import resolvers from './resolvers';
import schema from './schema';

const { ApolloServer } = ApolloServer;
const { HOST, JWT_SECRET, PORT } = process.env;

const context = async ({ req }) => {
  if (!req.headers.authorization) {
    throw Error('Not authenticated');
  }

  let user = null;
  const { id: userId } = jwt.verify(
    req.headers.authorization.replace('Bearer ', ''),
    JWT_SECRET
  );
  if (!userId) throw Error('Not authorized');
  const [, foundUser] = await on(instance.findOne('User', { id: userId }));
  if (!foundUser) throw Error('User not found');
  user = foundUser;

  const models = generateModels({ user });
  const context = { models, user };

  return context;
};

const server = new ApolloServer({
  context,
  typeDefs: schema,
  resolvers,
});

server.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}/graphql`);
});
