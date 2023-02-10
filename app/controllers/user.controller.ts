import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { getIdOrVoid, handlePrismaError } from "../utils/module_index";

const userService = new UserService();

export class UserController {
    async getUsers(_req: Request, res: Response) {
        try {
            const users = await userService.getUsers();
            res.json(users);
        } catch (error: unknown) {
            handlePrismaError(error, res);
        }
    }

    async getUserById(req: Request, res: Response) {
        const id = getIdOrVoid(req.params.id, res);
        if (id) {
            try {
                const user = await userService.getUserById(id);
                if (user) {
                    res.json(user);
                } else {
                    res.json({ message: "User not found for this id..." });
                }
            } catch (error: unknown) {
                handlePrismaError(error, res);
            }
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const newUser = await userService.createUser(req.body);
            res.json(newUser);
        } catch (error: unknown) {
            handlePrismaError(error, res);
        }
    }

    async updateUser(req: Request, res: Response) {
        const id = getIdOrVoid(req.params.id, res);
        if (id) {
            try {
                const doesUserExist = await userService.checkIfUserExists(id);
                if (doesUserExist) {
                    const updatedUser = await userService.updateUser(id, req.body);
                    res.json(updatedUser);
                } else {
                    res.json({ message: "User not found for this id..." });
                }
            } catch (error: unknown) {
                handlePrismaError(error, res);
            }
        }
    }

    async deleteUser(req: Request, res: Response) {
        const id = getIdOrVoid(req.params.id, res);
        if (id) {
            try {
                const doesUserExist = await userService.checkIfUserExists(id);
                if (doesUserExist) {
                    const deleteUser = await userService.deleteUser(id);
                    res.json(deleteUser);
                } else {
                    res.json({ message: "User not found for this id..." });
                }
            } catch (error: unknown) {
                handlePrismaError(error, res);
            }
        }
    }

    async toggleStatus(req: Request, res: Response) {
        const id = getIdOrVoid(req.params.id, res);
        if (id) {
            try {
                const user = await userService.getUserById(id);
                if (user) {
                    const updatedUser = await userService.toggleStatus(id, user.isAdmin);
                    res.json(updatedUser);
                } else {
                    res.json({ message: "User not found for this id..." });
                }
            } catch (error: unknown) {
                handlePrismaError(error, res);
            }
        }
    }
}