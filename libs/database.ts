import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export type CommentInput = {
    blogId: string,
    name: string,
    comment: string,
    createdAt: Date,
}

export async function createComment(params: CommentInput) {
    return await prisma.comment.create({data: params});
}

export async function fetchComments(blogId: string) {
  return await prisma.comment.findMany(
    {
      where: {
        blogId: blogId
      }
    }
  );
}