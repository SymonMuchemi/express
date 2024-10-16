import express, { Router } from "express";
import { asyncHandler } from "../utils/utils";
import { getPosts, getPostById } from "../middleware/postMiddleware";
const postRouter: Router = express.Router();

postRouter.get('/', asyncHandler(getPosts));
postRouter.get('/:id', asyncHandler(getPostById));

export default postRouter;
