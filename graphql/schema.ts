export const typeDefs = `#graphql 
type User {
  id: ID!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  profilePic: String
  createdAt: String!
  updatedAt: String!
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  category: Category
  createdAt: String!
  updatedAt: String!
  comments: [Comment!]!
  commentCount: Int!
}

type Comment {
  id: ID!
  content: String!
  post: Post!
  author: User!
  createdAt: String!
  updatedAt: String!
}


type Category {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Mutation {
  createUser(firstName: String!, lastName: String!, email: String!, password: String!, profilePic: String): User!
  createPost(title: String!, content: String!, authorId: Int!, categoryId: Int): Post!
  editPost(postId: Int, title: String!, content: String!,categoryId: Int): Post!
  createComment(content: String!, postId: Int!, authorId: Int!): Comment!
  createCategory(name: String!): Category!
  deletePost(id: ID!): Post! 
  editUserProfilePic(userId: ID!, profilePic: String!): User!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts(categoryId : Int): [Post!]!
  post(id: ID!): Post
  comments(postId: Int!): [Comment!]!
  categories: [Category!]!
  category(id: ID!): Category
  filterByCategory(categoryId: Int!): [Post!]!
}

`;
