import { gql } from "@apollo/client";

export const CREATE_COMMNET = gql`
  mutation CreateComment($content: String!, $authorId: Int!, $postId: Int!) {
    createComment(content: $content, authorId: $authorId, postId: $postId) {
      id
      content
      author {
        firstName
        lastName
      }
    }
  }
`;

export const EDIT_PROFILE_PIC = gql`
  mutation Mutation($userId: ID!, $profilePic: String!) {
    editUserProfilePic(userId: $userId, profilePic: $profilePic) {
      firstName
      lastName
      profilePic
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $authorId: Int!
    $categoryId: Int
  ) {
    createPost(
      title: $title
      content: $content
      authorId: $authorId
      categoryId: $categoryId
    ) {
      id
      title
      content
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost(
    $title: String!
    $content: String!
    $postId: Int
    $categoryId: Int
  ) {
    editPost(
      title: $title
      content: $content
      postId: $postId
      categoryId: $categoryId
    ) {
      title
      content
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      title
    }
  }
`;
