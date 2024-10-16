import { Request, Response } from "express";
import { fetchPublishedPosts } from "../controllers/feedController";

/**
 * Middleware to handle fetching the feed of published posts.
 * 
 * @param req - The request object.
 * @param resp - The response object.
 * 
 * @returns A JSON response containing the feed of published posts or an error message.
 * 
 * @throws Will return a 400 status code with an error message if fetching the feed fails.
 */
export const getFeed = async (req: Request, resp: Response) => {
    try {
        const feed = await fetchPublishedPosts();
        resp.json(feed);
    } catch (error: any) {
        resp.status(400).json({ message: 'Error fetching feed!', details: error.toString() });
    }
}
