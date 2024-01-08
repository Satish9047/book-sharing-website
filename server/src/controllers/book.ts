import { IQueryBookDb } from "./../interfaces/book";
import { Request, Response } from "express";
import * as bookServices from "../services/book";
import { IAddBook } from "../interfaces/book";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";


export const getBooks = async (req: Request, res: Response) => {
    const data = await bookServices.getBooks();
    //console.log(data);
    res.json({ data });
};

export const getSearchedBook = async (req: Request, res: Response) => {
    const { name, author, keyword, category } = req.query;
    const queryBook: IQueryBookDb = {
        book_name: typeof name === "string" ? name : undefined,
        author_name: typeof author === "string" ? author : undefined,
        keyword: typeof keyword === "string" ? keyword : undefined,
        category_name: typeof category === "string" ? category : undefined,
    };
    const data = await bookServices.getSearchedBooks(queryBook);
    res.json(data);
};


export const addBookHandler = async (req: Request, res: Response) => {
    const bookInfo: IAddBook = req.body;
    try {
        const accessToken = req.cookies.accessToken;
        const userData = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET) as JwtPayload;
        const id = userData.id;
        bookInfo.user = Number(id);

        const bookFile = req.files;
        //@ts-expect-error
        bookInfo.pdfPath = bookFile?.pdfFile?.[0].path;
        //@ts-ignore
        bookInfo.imgPath = bookFile?.imgFile?.[0].path;


        //console.log(bookInfo);
        const data = await bookServices.addBookHandler(bookInfo);
        res.json({ data });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "unauthorized" });
    }
};

export const updateBookHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const bookInfo: string = req.params.id;
    const data = await bookServices.updateBookHandler(bookInfo);
    res.json({ msg: "hello from the update book controller", data });
};

export const deleteBookHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const bookInfo: string = req.params.id;
    const data = await bookServices.deleteBookHandler(bookInfo);
    res.json({ data });
};


