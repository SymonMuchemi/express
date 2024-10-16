import express, { Router } from "express";
import { getUsers } from "../middleware/userMiddlewares";
import { asyncHandler } from "../utils/utils";

const userRouter: Router = express.Router();

userRouter.get('/', asyncHandler(getUsers));


export default userRouter;
