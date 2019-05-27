import apollo from 'apollo-server';

const { gql } = apollo;

export default gql`
  type Query {
    login(email: String, password: String): JWT
    posts: [Post]
  }
  type Mutation {
    register(email: String, password: String): JWT
    createPost(input: PostInput): Post
    updatePost(input: PostInput): Post
    deletePost(id: String): Post
  }
  type JWT {
    token: String
  }
  type User {
    posts: [Post]
    id: ID!
    email: String
  }
  type Post {
    user: User
    id: ID!
    about: String
    image: String
    phone: String
    price: Float
  }
  input PostInput {
    about: String
    image: String
    phone: String
    price: Float
  }
`;
