import { PrismaClient, Post } from "@prisma/client";
import { PostBody } from "../types/types";

const prisma: PrismaClient = new PrismaClient();

/**
 * Fetches all posts from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export const fetchAllPosts = async () => {
    const posts: Post[] = await prisma.post.findMany();

    return posts;
}

/**
 * Fetches a post by its unique identifier.
 *
 * @param id - The unique identifier of the post to fetch.
 * @returns A promise that resolves to the post object if found, otherwise null.
 */
export const fetchPostById = async (id: number) => {
    const post: Post | null = await prisma.post.findUnique({
        where: { id: id }
    });

    return post;
}

/**
 * Creates a new post with the given post body.
 *
 * @param postBody - The body of the post to be created, containing title, content, and author email.
 * @returns The created post object.
 */
export const createPost = async (postBody: PostBody) => {
    const { title, content, authorEmail } = postBody;
    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: { connect: { email: authorEmail } }
        },
    });

    return result;
}

/**
 * Publishes a post by updating its `published` status to `true`.
 *
 * @param id - The unique identifier of the post to be published.
 * @returns A promise that resolves to the updated post object.
 */
export const publishPost = async (id: number) => {
    const publishedPost = await prisma.post.update({
        where: { id: id },
        data: { published: true }
    });

    return publishedPost;
}

export const deletePost = async (id: number) => {
    const deletedPost = await prisma.post.delete({
        where: { id: id }
    });

    return deletedPost;
}
