import Neode from 'neode';

const instance = new Neode(
  'bolt://localhost:7687',
  'username',
  'password',
  true
);

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
export const generateModels = ({ user }) => instance;
