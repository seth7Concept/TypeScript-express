import express, { Express, Request, Response } from 'express';
import { router as messageRouter } from './routes/message.router';
import { router as userRouter } from './routes/user.router';
require('dotenv').config();
// import {client} from "./prisma";
const app: Express = express();
app.use(express.json());

//prisma
const port = process.env.PORT;
app.use(express.json());

app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.get("/", (_: Request, res: Response) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}/ `);
})