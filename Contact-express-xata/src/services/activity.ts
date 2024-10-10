import express, { Router, Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { XataClient } from "../xata";
import { activitySchema } from './validators/validations';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const xata: XataClient = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH
});

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

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
router.post('/', activitySchema, asyncHandler(async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        console.log(`Creating activity: ${req.body}`);
        resp.json(await xata.db.activity.create(req.body));
    } catch (err: any) {
        resp.status(500).send({ Error: err.toString() });
    }
}));

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
router.patch('/:id', activitySchema, asyncHandler(async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        console.log(`Updating activity: ${req.params.id}`);
        resp.json(await xata.db.activity.update(req.params.id, req.body));
    } catch (err: any) {
        resp.status(400).send({ Error: err.toString() });
    }
}));

router.delete('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Deleting activity: ${req.params.id}`);
        resp.json(await xata.db.activity.delete(req.params.id));
    } catch (err: any) {
        resp.status(400).send({ Error: err.toString() });
    }
})

export default router;
