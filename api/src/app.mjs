import apollo from 'apollo-server';
import jwt from 'jsonwebtoken';
import on from 'await-on';

import { generateModels, instance } from './models';
import resolvers from './resolvers';
import schema from './schema';

const { ApolloServer } = apollo;
const { JWT_SECRET } = process.env;

const context = async ({ req }) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const data = token && jwt.verify(token, JWT_SECRET);
  const [, user] = data
    ? await on(instance.model('User').findById(data.id))
    : [,];
  const models = generateModels({ user });

  return { models, user };
};

const server = new ApolloServer({
  context,
  typeDefs: schema,
  resolvers,
});

server.listen(1337, () => {
  console.log(`Running on http://localhost:1337/graphql`);
});
