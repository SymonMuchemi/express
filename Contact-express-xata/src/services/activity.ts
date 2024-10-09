import express, { Router, Response, Request } from "express";
import { XataClient } from "../xata";
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const xata: XataClient = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH
});

// fetch all activity objects from the database
router.get('/', async (req: Request, resp: Response) => {
    try {
        const query = req.query;
        resp.json(await xata.db.activity.filter(query).getMany());
    } catch (error: any) {
        resp.status(500).send({ Error: error.toString() });
    }
});



export default router;
