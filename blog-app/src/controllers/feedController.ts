import { PrismaClient, Post } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();

/**
 * Fetches all published posts from the database.
 *
 * This function queries the database for posts that have been marked as published
 * and includes the author information for each post.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of published posts, 
 * each including its author information.
 */
export const fetchPublishedPosts = async () => {
    const publishedPosts: Post[] = await prisma.post.findMany({
        where: { published: true },
        include: { author: true }
    });

    return publishedPosts;
}
