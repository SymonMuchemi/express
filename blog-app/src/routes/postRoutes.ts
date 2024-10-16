import express, { Router } from "express";
import { asyncHandler } from "../utils/utils";
import { getPosts, getPostById, create } from "../middleware/postMiddleware";
import { postSchema } from "../validators/postValidator";

const postRouter: Router = express.Router();

postRouter.get('/', asyncHandler(getPosts));
postRouter.get('/:id', asyncHandler(getPostById));
postRouter.post('/', postSchema, asyncHandler(create));

export default postRouter;
