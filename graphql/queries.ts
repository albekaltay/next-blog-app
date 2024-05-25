import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts($categoryId: Int) {
    posts(categoryId: $categoryId) {
      id
      title
      content
      createdAt
      author {
        id
        firstName
        lastName
        profilePic
      }
      comments {
        content
      }
      commentCount
    }
  }
`;

export const GET_POST = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      title
      content
      author {
        firstName
        lastName
        email
      }
      category {
        name
      }
      createdAt
      updatedAt
      comments {
        author {
          firstName
          lastName
          profilePic
        }
        content
        createdAt
      }
    }
  }
`;

export const GET_USER = gql`
  query User($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      profilePic
      email
    }
  }
`;

export const GET_POST_TO_FORM = gql`
  query Query($postId: ID!) {
    post(id: $postId) {
      title
      content
      category {
        id
        name
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
    }
  }
`;
