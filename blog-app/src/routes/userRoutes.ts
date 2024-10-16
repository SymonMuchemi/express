import express, { Router } from "express";
import { getUsers, getUserById, create } from "../middleware/userMiddlewares";
import { asyncHandler } from "../utils/utils";
import { userSchema } from "../validators/userValidator";

const userRouter: Router = express.Router();

userRouter.get('/', asyncHandler(getUsers));
userRouter.get('/:id', asyncHandler(getUserById));
userRouter.post('/', userSchema, asyncHandler(create))

export default userRouter;
