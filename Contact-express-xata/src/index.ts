import express, { Application, Request, Response } from "express";
import contact from './services/contact';
import activity from './services/activity';

import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// test route
app.get('/api', (req: Request, resp: Response) => {
    resp.json({ msg: "Hello" });
});

// include the contact route in contact.ts
app.use('/api/contact/', contact);

// include the activity route in activity.ts
app.use('/api/activity', activity);

app.listen(PORT, () => {
    console.log(`Express server listening on port: ${PORT}`);
})
