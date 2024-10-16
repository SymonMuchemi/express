import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
    fetchAllPosts,
    fetchPostById,
    createPost,
    publishPost
} from "../controllers/postController";

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
        const post = await fetchPostById(Number(req.params.id));

        resp.json(post)
    } catch (error: any) {
        resp.status(400).json({ error: error.toString() })
    }
}

/**
 * Handles the creation of a new post.
 * 
 * This middleware function validates the request for any errors, and if none are found,
 * it proceeds to create a new post using the provided data in the request body.
 * 
 * @param req - The request object containing the post data.
 * @param resp - The response object used to send back the appropriate response.
 * 
 * @returns A JSON response indicating the success or failure of the post creation.
 * 
 * @throws Will return a 400 status code with error details if post creation fails.
 */
export const create = async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const post = req.body;
        const result = await createPost(post);

        resp.json({ message: 'Post created successfully!', post: result });
    } catch (error: any) {
        resp.status(400).json({ message: 'Error creating post!', details: error.toString() });
    }
}

/**
 * Publishes a blog post based on the provided post ID in the request parameters.
 * 
 * @param req - The request object containing the post ID in the parameters.
 * @param resp - The response object used to send the response back to the client.
 * 
 * @returns A JSON response with a success message and the published post data, 
 *          or an error message if the publishing fails.
 */
export const publish = async (req: Request, resp: Response) => {
    try {
        await publishPost(Number(req.params.id));
        resp.json({ message: 'Post published!' })
    } catch (error: any) {
        resp.status(400).json({ error: error.toString() })
    }
}
