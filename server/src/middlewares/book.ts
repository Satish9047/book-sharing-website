import { Request, Response, NextFunction } from "express";
import { addBookSchema, queryPageSchema, queryBookSchema, uploadBookSchema } from "../schema/book";

//addbook middleware
export const addBookMiddlware = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
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
        return res.status(400).json({ error: error });
    }
    next();
};

//queryPage middleware
export const queryPageMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const { error } = queryPageSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error });
    }
    next();
};

// uploadBook middleware
export const uploadBookVerify = (req:Request, res: Response, next: NextFunction) => {
    console.log("hello form book middlware 1:",req.body);
    console.log("hello form book middlware 2:",req.query);
    console.log("hello form book middlware 3:",req.files);
    const bookFile = req.files as {[fieldname: string]: Express.Multer.File[]};
    const uploadData = req.body;
    uploadData.pdfPath = bookFile?.pdfFile?.[0].path;
    uploadData.imgPath = bookFile?.imgFile?.[0].path;
    console.log("add book data:", uploadData);

    const {error} = uploadBookSchema.validate(uploadData);
    if(error){
        return res.status(400).json({error:error});
    }
    next();
};