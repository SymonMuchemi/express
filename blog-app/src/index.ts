import express, { Application, Request, Response } from "express";
import userRouter from "./routes/userRoutes";
import dotenv from 'dotenv';

dotenv.config()

const app: Application = express();
const PORT: string | number = process.env.PORT || 3500

app.use(express.json());

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
