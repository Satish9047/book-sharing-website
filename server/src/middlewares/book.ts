import { Request, Response, NextFunction } from "express";
import { addBookSchema } from "../schema/book";

//addbook middleware
export const addBookMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = addBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "invalid credentials provided" });
    }
    next();
};