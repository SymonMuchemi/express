import { Request, Response } from "express";
import { fetchPublishedPosts } from "../controllers/feedController";

export const getFeed = async (req: Request, resp: Response) => {
    try {
        const feed = await fetchPublishedPosts();
        resp.json(feed);
    } catch (error: any) {
        resp.status(400).json({ message: 'Error fetching feed!', details: error.toString() });
    }
}
