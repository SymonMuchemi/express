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

// create an activity object
router.post('/', async (req: Request, resp: Response) => {
    try {
        console.log(`Creating activity: ${req.body}`);
        resp.json(await xata.db.activity.create(req.body));
    } catch (err: any) {
        resp.status(500).send({ Error: err.toString() });
    }
});

// get activity by its ID
router.get('/:id', async (req: Request, resp: Response) => {
    try {
        const activityId = req.params.id;

        if (typeof activityId === 'undefined') throw new Error('Id is undefined');
        console.log(`Trying to query of ${activityId}`);
        resp.json(await xata.db.activity.read(activityId));
    } catch (err: any) {
        resp.status(500).send({ Error: err.toString() });
    }
});

// update an activity
router.patch('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Updating activity: ${req.params.id}`);
        resp.json(await xata.db.activity.update(req.params.id, req.body));
    } catch (err: any) {
        resp.status(400).send({Error: err.toString()});
    }
});

export default router;
