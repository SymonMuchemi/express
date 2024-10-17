import express, { Router } from "express";
import { asyncHandler } from "../utils/utils";
import { getFeed } from "../middleware/feedMiddleware";

const feedRouter: Router = express.Router();

feedRouter.get('/feed', asyncHandler(getFeed));

export default feedRouter;
