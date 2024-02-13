import { Request, Response } from "express";
import * as bookServices from "../services/book";
import { IAuthRequest } from "../interfaces/auth";
import { IPage, IBookInfo, IQueryBookDb, IAddBook } from "./../interfaces/book";


//get books controller
export const getBooks = async (req: Request, res: Response) => {
    // console.log(req.query.skip, req.query.take, "hello fro the cotroller");
    const page: IPage = {
        skip: Number(req.query.skip) || 0,
        take: Number(req.query.take) || 10,
    };

    try {
        const data = await bookServices.getBooks(page);
        if (!data) return res.status(404).json(data);
        // console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error while getting books" });
    }
};

//get book by ID
export const getBookById = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    try {
        const data = await bookServices.getBookById(bookId);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while getting book" });
    }
};

//search book handler
export const getSearchedBook = async (req: Request, res: Response) => {
    const { name, author, keyword, category } = req.query;

    const page: IPage = {
        skip: Number(req.query?.skip) || 0,
        take: Number(req.query?.take) || 10,
    };

    const queryBook: IQueryBookDb = {
        book_name: typeof name === "string" ? name : undefined,
        author_name: typeof author === "string" ? author : undefined,
        keyword: typeof keyword === "string" ? keyword : undefined,
        category_name: typeof category === "string" ? category : undefined,
    };
    try {
        const data = await bookServices.getSearchedBooks(queryBook, page);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while searching book" });
    }
};

//upload book handler
export const addBookHandler = async (req: IAuthRequest, res: Response) => {
    const bookInfo: IAddBook = req.body;
    try {
        bookInfo.user = Number(req.user);
        const bookFile = req.files as { [fieldname: string]: Express.Multer.File[] };
        // console.log(bookFile);

        bookInfo.pdfPath = bookFile?.pdfFile?.[0].path;
        bookInfo.imgPath = bookFile?.imgFile?.[0].path;

        const data = await bookServices.addBookHandler(bookInfo);
        return res.status(201).json({ msg: "Book uploaded successfully ", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while adding book" });
    }
};


//delete book handler
export const deleteBookHandler = async (req: IAuthRequest, res: Response) => {
    // console.log(req.user, "user id from controller");
    const userId = req.user;
    const bookInfo: IBookInfo = {
        userId: Number(userId),
        bookId: Number(req.params.id),
    };
    try {
        const data = await bookServices.deleteBookHandler(bookInfo);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while deleting book" });
    }
};

//download pdf handler
export const downloadBookHandler = async (req: Request, res: Response) => {
    const bookInfo = Number(req.params.id);

    try {
        const data = await bookServices.downloadBookHandler(bookInfo);
        if ("error" in data) {
            return res.status(404).json({ error: data.error });
        }
        res.setHeader("content-type", "application/pdf");
        res.setHeader("Content-disposition", "attachment; filename=book.pdf");
        return data.pipe(res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while downloading book" });
    }

};

//get image handler
export const getImageHandler = async (req: Request, res: Response) => {
    const bookInfo = Number(req.params.bookId);
    try {
        const data = await bookServices.getImageHandler(bookInfo);
        if ("error" in data) {
            return res.status(404).json({ error: data.error });
        }
        res.set("Content-Type", "image/jpeg");
        return data.pipe(res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while getting book image" });
    }
};

//get book by user controller
export const getBookByUser = async (req: IAuthRequest, res: Response) => {
    const userId = Number(req.user);
    const page: IPage = {
        skip: Number(req.query?.skip) || 0,
        take: Number(req.query?.take) || 10,
    };
    try {
        const data = await bookServices.getBookByUser(userId, page);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error while getting books" });
    }
};


