import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config()

const app: Application = express();
const port: number | string = process.env.PORT || 3500;

app.use(express.json());

// simple test route
app.get('/', (req: Request, resp: Response) => {
    resp.send({Message: "Hello from Typescript!"});
});

app.listen(port, () => {
    console.log(`Server is listening on Port: ${port}`);
})
