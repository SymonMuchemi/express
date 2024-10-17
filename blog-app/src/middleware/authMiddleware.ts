import { registerUser } from "../controllers/authContoller";
import { Request, Response } from 'express';


export const register = async (req: Request, resp: Response) => {
    try {
        const response = await registerUser(req.body);

        resp.status(response.code).json(response.message);
    } catch (error: any) {
        resp.status(400).json({ error: error.toString() })
    }
}
