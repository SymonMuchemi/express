import express, { Router } from "express";
import { getUsers, getUserById } from "../middleware/userMiddlewares";
import { asyncHandler } from "../utils/utils";

const userRouter: Router = express.Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/:id', asyncHandler(getUserById));


export default userRouter;
