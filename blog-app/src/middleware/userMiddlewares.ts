import { Request, Response } from 'express';
import { getAllUsers } from '../controllers/userController';

export const getUsers = async (req: Request, resp: Response) => {
    try {
        const users = await getAllUsers();
        resp.json(users)
    } catch (error: any) {
        resp.status(500).json({ Error: error.toString() });
    }
}
