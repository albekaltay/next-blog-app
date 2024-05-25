import { string } from "yup";

export interface IPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: IAuthor;
  comments: any[];
  commentCount: number;
}

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}
