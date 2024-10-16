import express, { Router, Application, Request, Response, NextFunction } from "express";
import { getUsers } from "../middleware/userMiddlewares";

const userRouter: Router = express.Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

userRouter.get('/', getUsers);


export default userRouter;
