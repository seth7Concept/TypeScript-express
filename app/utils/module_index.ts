import { Prisma } from "@prisma/client";
import { Response } from "express";

export function getIdOrVoid(id: string, res: Response): number | void {
  const parsedId = parseInt(id);
  if (!parsedId) {
    res.json({ error: "Id can't be parsed into number..." });
    return;
  } else {
    return parsedId;
  }
}

export function handlePrismaError(error: unknown, res: Response) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    res.json(error.message);
  } else {
    res.json(error);
  }
}
