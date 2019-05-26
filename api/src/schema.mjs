import { gql } from 'apllo-server';

export default gql`
  type Query {
    login(email: String, password: String): JWT
    register(email: String, password: String): JWT
    posts: [Post]
  }
  type Mutation {
    createPost(image: String, title: String, price: String): Post
    updatePost(image: String, title: String, price: String): Post
    deletePost(image: String, title: String, price: String): Post
  }
  type JWT {
    token: String
  }
  type Post {
    id: ID!
    about: String
    image: String
    phone: String
    price: String
  }
`;
