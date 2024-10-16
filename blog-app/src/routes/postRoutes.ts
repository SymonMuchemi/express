import express, { Router } from "express";
import { asyncHandler } from "../utils/utils";
import { postSchema } from "../validators/postValidator";
import { getPosts, getPostById, create, publish, deleteMiddleware } from "../middleware/postMiddleware";

const postRouter: Router = express.Router();

postRouter.get('/', asyncHandler(getPosts));
postRouter.get('/:id', asyncHandler(getPostById));
postRouter.post('/', postSchema, asyncHandler(create));
postRouter.put('/publish/:id', asyncHandler(publish));
postRouter.delete('/:id', asyncHandler(deleteMiddleware));

export default postRouter;
