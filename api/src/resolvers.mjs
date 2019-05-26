import jwt from 'jsonwebtoken';
import on from 'await-on';
import uuidv4 from 'uuid/v4';

const { JWT_SECRET } = process.env;

export default {
  Query: {
    register(parent, { email, password }, context) {
      return {
        token: jwt.sign({ id: uuidv4() }, JWT_SECRET),
      };
    },
    login(parent, { email, password }, context) {
      return {
        token: jwt.sign({ id: uuidv4() }, JWT_SECRET),
      };
    },
    posts(parent, { email, password }, context) {
      const [error, posts] = await on(context.models.all('Posts'));
      if (error) throw Error('Issue retrieving posts')
      return posts;
    },
  },
  User: {
    posts(parent, { email, password }, context) {
      const userId = parent.id;
      const [error, posts] = await on(context.models.all('Posts', { id: userId }));
      if (error) throw Error('Issue retrieving posts')
      return posts;
    }
  }
};
