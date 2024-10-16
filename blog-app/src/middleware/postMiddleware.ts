import { Request, Response } from "express";
import { fetchAllPosts, fetchPostById } from "../controllers/postController";

/**
 * Retrieves all posts and sends them in the response.
 * 
 * @param req - The request object.
 * @param resp - The response object.
 * 
 * @returns A promise that resolves to sending the posts in JSON format.
 * 
 * @throws Will send a 500 status code and an error message if fetching posts fails.
 */
export const getPosts = async (req: Request, resp: Response) => {
    try {
        const posts = await fetchAllPosts();
        resp.json(posts);
    } catch (error: any) {
        resp.status(500).json({ error: error.toString() })
    }
}

/**
 * Middleware function to fetch a post by its ID.
 * 
 * @param req - The request object, containing the post ID in the parameters.
 * @param resp - The response object.
 * 
 * @returns A promise that resolves to the post data.
 * 
 * @throws Will throw an error if the post cannot be fetched.
 */
export const getPostById = async (req: Request, resp: Response) => {
    try {
        const id: number = Number(req.params.id);
        const post = await fetchPostById(id);

        resp.json(post)
    } catch (error: any) {
        resp.status(400).json({ error: error.toString() })
    }
}
