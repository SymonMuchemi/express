import express, { Router, Request, Response } from 'express';
import { XataClient } from '../xata';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const xata = new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH
});

router.get('/', async (req: Request, resp: Response) => {
    try {
        console.log('Trying to get contact records.');
        let query = req.query;

        const records = await xata.db.contact.filter(query).getMany();
        resp.json(records);
    } catch (error: any) {
        resp.status(500).send(error.toString());
    }
});

router.get('/:id', async (req: Request, resp: Response) => {
    try {
        const recordId = req.params.id;
        console.log('Trying to query for: ', recordId);

        if (typeof recordId === 'undefined') throw new Error("Id id undefined");
        resp.json(await xata.db.contact.read(recordId));
    } catch (error: any) {
        resp.status(500).send(error.toString());
    }
});

router.post('/', async (req: Request, resp: Response) => {
    // TODO: ADD DATA VALIDATION
    try {
        console.log('Creating contact record: ', req.body);
        resp.json(await xata.db.contact.create(req.body));
    } catch (error: any) {
        resp.status(500).send(error.toString());
    }
});

// updating a contact object
router.patch('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Updating contact: ${req.params.id}`);
        resp.json(await xata.db.contact.update(req.params.id, req.body));
    } catch (error: any) {
        resp.status(500).send({Error: error.toString()});
    }
})

router.delete('/:id', async (req: Request, resp: Response) => {
    try {
        console.log(`Deleting contact: ${req.params.id}`);
        resp.json(await xata.db.contact.delete(req.params.id));
    } catch (error: any) {
        resp.status(500).send({Error: error.toString()});
    }
})

export default router;
