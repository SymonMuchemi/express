import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { fetchAllUsers, fetchUserById, createUser } from '../controllers/userController';

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

export const create = async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const result = await createUser(req.body);

        resp.json({ message: 'Post created successfully!', user: result })

    } catch (error: any) {
        resp.status(400).json({ message: 'Error creating user!', details: error.toString() });
    }
}
