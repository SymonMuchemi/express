import express, { Application } from "express";
import routes from "./routes";
import dotenv from 'dotenv';

dotenv.config()

const app: Application = express();
const PORT: string | number = process.env.PORT || 3500

app.use(express.json());

app.use('/api/v1', ...routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})
