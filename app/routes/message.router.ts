import express, { Request, Response } from 'express';
import { client } from "../src/prisma";
export const router = express.Router();

router.get('/', async(_req: Request, res: Response) => {
    const messages = await client.message.findMany({
        include:{
            user:{
                select:{
                username: true,
                },
            },
        }
    })
    return res.json(messages);
})

router.post("/", async (req: Request, res: Response) => {
    const newMessage = await client.message.create({
        data:{
            message: req.body.message,
            userId: req.body.userId
        }
    })
    return res.json(newMessage)
});