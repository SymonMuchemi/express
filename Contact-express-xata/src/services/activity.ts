import express, { Router, Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { XataClient } from "../xata";
import { activitySchema } from './validators/validations';
import { Activity } from './validators/types'
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
        const createdObj = await xata.db.activity.create(req.body);
        resp.json({ Message: 'Creating successfull!', payload: createdObj });
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
router.patch('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Updating activity: ${req.params.id}`);
        const body = req.body;
        const updatedObj = await xata.db.activity.update(req.params.id, body);
        resp.json({ Message: 'Update successful!', Payload: updatedObj });
    } catch (err: any) {
        resp.status(400).send({ Error: err.toString() });
    }
});

router.delete('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Deleting activity: ${req.params.id}`);
        const deletedObj = await xata.db.activity.deleteOrThrow(req.params.id)
        resp.json({ Message: 'Deletion successful!', Payload: deletedObj });
    } catch (err: any) {
        resp.status(400).send({ Error: err.toString() });
    }
})

export default router;
