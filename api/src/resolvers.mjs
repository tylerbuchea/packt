import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import on from 'await-on';
import uuidv4 from 'uuid/v4';

const { JWT_SECRET } = process.env;

export default {
  Query: {
    async login(parent, { email, password }, context) {
      const [error, user] = await on(context.models.User.find({ email }));
      if (error) throw Error('Cannot find user');

      const match = bcrypt.hashSync(password, 10) === user.hash;
      if (!match) throw Error('Wrong password');

      const token = jwt.sign({ id: user.id }, JWT_SECRET);

      return { token };
    },
    posts(parent, args, context) {
      return context.models.Post.all();
    },
  },
  Mutation: {
    register(parent, { email, password }, context) {
      return context.models.User.create({
        id: uuidv4(),
        email,
        hash: bcrypt.hashSync(password, 10),
      }).then(user => user.id);
    },
    createPost(parent, { input }, context) {
      return context.models.Post.create(input);
    },
    updatePost(parent, { id, input }, context) {
      return context.models.Post.update(id, input);
    },
    deletePost(parent, { id }, context) {
      return context.models.Post.delete(id);
    },
  },
  Post: {
    user(parent, args, context) {
      return context.models.User.findById(parent.id);
    },
  },
  User: {
    posts(parent, args, context) {
      return context.models.Post.all(parent.postIds);
    },
  },
};
