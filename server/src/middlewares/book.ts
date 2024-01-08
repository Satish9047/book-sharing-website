import { Request, Response, NextFunction } from "express";
import { addBookSchema, queryBookSchema } from "../schema/book";

//addbook middleware
export const addBookMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = addBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "invalid credentials provided" });
    }
    next();
};

//queryBook middleware
export const queryBookMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = queryBookSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: "invalid credentials provided" });
    }
    next();
};