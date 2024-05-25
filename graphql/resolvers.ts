import { Context } from "../app/api/graphql/route";
import bcrypt from "bcryptjs";

export const resolvers = {
  Query: {
    users: async (_parent: any, _args: any, context: Context) =>
      await context.prisma.user.findMany(),
    user: async (_parent: any, args: { id: string }, context: Context) =>
      await context.prisma.user.findUnique({
        where: { id: parseInt(args.id) },
      }),
    posts: async (
      _parent: any,
      args: { categoryId: number },
      context: Context
    ) => {
      if (args.categoryId) {
        return await context.prisma.post.findMany({
          where: {
            categoryId: args.categoryId,
          },
        });
      } else {
        return await context.prisma.post.findMany();
      }
    },
    post: async (_parent: any, args: { id: string }, context: Context) =>
      await context.prisma.post.findUnique({
        where: { id: parseInt(args.id) },
      }),
    comments: async (
      _parent: any,
      args: { postId: number },
      context: Context
    ) =>
      await context.prisma.comment.findMany({ where: { postId: args.postId } }),
    categories: async (_parent: any, _args: any, context: Context) =>
      await context.prisma.category.findMany(),
    category: async (_parent: any, args: { id: string }, context: Context) =>
      await context.prisma.category.findUnique({
        where: { id: parseInt(args.id) },
      }),
  },
  Mutation: {
    createUser: async (
      _parent: any,
      args: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        profilePic: string;
      },
      context: Context
    ) => {
      const hashedPassword = bcrypt.hashSync(args.password, 10);
      return await context.prisma.user.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: hashedPassword,
          profilePic: args.profilePic,
        },
      });
    },
    createPost: async (
      _parent: any,
      args: {
        title: string;
        content: string;
        authorId: number;
        categoryId: number;
      },
      context: Context
    ) => {
      return await context.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          authorId: args.authorId,
          categoryId: args.categoryId,
        },
      });
    },
    editPost: async (
      _parent: any,
      args: {
        postId: number;
        title: string;
        content: string;
        categoryId: number;
      },
      context: Context
    ) => {
      return await context.prisma.post.update({
        where: { id: args.postId },
        data: {
          title: args.title,
          content: args.content,
          categoryId: args.categoryId,
          updatedAt: new Date(),
        },
      });
    },

    deletePost: async (
      _parent: any,
      args: { id: string },
      context: Context
    ) => {
      await context.prisma.comment.deleteMany({
        where: { postId: parseInt(args.id) },
      });

      const post = await context.prisma.post.delete({
        where: { id: parseInt(args.id) },
      });
      return post;
    },

    createComment: async (
      _parent: any,
      args: {
        content: string;
        postId: number;
        authorId: number;
      },
      context: Context
    ) => {
      return await context.prisma.comment.create({
        data: {
          content: args.content,
          postId: args.postId,
          authorId: args.authorId,
        },
      });
    },
    createCategory: async (
      _parent: any,
      args: { name: string },
      context: Context
    ) => {
      return await context.prisma.category.create({
        data: { name: args.name },
      });
    },
    editUserProfilePic: async (
      _parent: any,
      args: { userId: number; profilePic: string },
      context: Context
    ) => {
      const user = await context.prisma.user.update({
        where: { id: Number(args.userId) },
        data: { profilePic: args.profilePic, updatedAt: new Date() },
      });
      return user;
    },
  },
  User: {
    posts: async (parent: any, _args: any, context: Context) =>
      await context.prisma.post.findMany({ where: { authorId: parent.id } }),
    comments: async (parent: any, _args: any, context: Context) =>
      await context.prisma.comment.findMany({ where: { authorId: parent.id } }),
  },
  Post: {
    author: async (parent: any, _args: any, context: Context) =>
      await context.prisma.user.findUnique({ where: { id: parent.authorId } }),
    comments: async (parent: any, _args: any, context: Context) =>
      await context.prisma.comment.findMany({ where: { postId: parent.id } }),
    category: async (parent: any, _args: any, context: Context) =>
      await context.prisma.category.findUnique({
        where: { id: parent.categoryId },
      }),
    commentCount: async (parent: any, _args: any, context: Context) =>
      await context.prisma.comment.count({ where: { postId: parent.id } }),
  },
  Comment: {
    post: async (parent: any, _args: any, context: Context) =>
      await context.prisma.post.findUnique({ where: { id: parent.postId } }),
    author: async (parent: any, _args: any, context: Context) =>
      await context.prisma.user.findUnique({ where: { id: parent.authorId } }),
  },
  Category: {
    posts: async (parent: any, _args: any, context: Context) =>
      await context.prisma.post.findMany({
        where: { categoryId: parent.id },
      }),
  },
};
