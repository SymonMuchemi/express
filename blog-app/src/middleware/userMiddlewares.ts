import { Request, Response } from 'express';
import { fetchAllUsers, fetchUserById } from '../controllers/userController';

export const getUsers = async (req: Request, resp: Response) => {
    try {
        const users = await fetchAllUsers();
        resp.json(users)
    } catch (error: any) {
        resp.status(500).json({ Error: error.toString() });
    }
}

export const getUserById = async (req: Request, resp: Response) => {
    try {
        const user = await fetchUserById(Number(req.params.id));
        resp.json(user);
    } catch (error: any) {
        resp.status(400).json({ error: error.toString() });
    }
}
