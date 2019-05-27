import Neode from 'neode';

const {
  NEO_HOST = 'bolt://localhost:7687',
  NEO_USER = 'neo4j',
  NEO_PASSWORD = 'changeme',
} = process.env;
const instance = new Neode(NEO_HOST, NEO_USER, NEO_PASSWORD);

instance.model('User', {
  postIds: [String],
  id: String,
  email: String,
  hash: String,
});

instance.model('Post', {
  id: String,
  about: String,
  image: String,
  phone: String,
  price: String,
});

export { instance };
export const generateModels = ({ user }) => ({
  Post: () => ({
    all(...properties) {
      return instance.model('Post').all(...properties);
    },
    create(...properties) {
      return instance.model('Post').create(...properties);
    },
    update(id, properties) {
      return instance
        .model('Post')
        .findById(id)
        .update(post => post.update(properties));
    },
    delete(id) {
      return instance
        .model('Post')
        .findById(id)
        .delete(post => post.delete());
    },
  }),
  User: () => ({
    all(...properties) {
      return instance.model('User').all(...properties);
    },
    create(...properties) {
      return instance.model('User').create(...properties);
    },
    findById(id) {
      return instance.model('User').findById(id);
    },
  }),
});
