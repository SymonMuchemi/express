import { PrismaClient } from "@prisma/client";
import express, { Express, Application } from "express";
import dotenv from 'dotenv';

dotenv.config()

const prisma: PrismaClient = new PrismaClient();
const app: Application = express();
const PORT: string | number = process.env.PORT || 3500

app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
