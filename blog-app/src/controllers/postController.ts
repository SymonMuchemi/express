import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

/**
 * Fetches all posts from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export const fetchAllPosts = async () => {
    const posts = await prisma.post.findMany();

    return posts;
}

/**
 * Fetches a post by its unique identifier.
 *
 * @param id - The unique identifier of the post to fetch.
 * @returns A promise that resolves to the post object if found, otherwise null.
 */
export const fetchPostById = async (id: number) => {
    const post = await prisma.post.findUnique({
        where: { id: id }
    });

    return post;
}
