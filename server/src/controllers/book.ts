import { IBookInfo, IQueryBookDb } from "./../interfaces/book";
import { Request, Response } from "express";
import * as bookServices from "../services/book";
import { IAddBook } from "../interfaces/book";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { IPage } from "./../interfaces/book";
import { IAuthRequest } from "../interfaces/auth";

//get books
export const getBooks = async (req: Request, res: Response) => {
    console.log(req.query.skip, req.query.take, "hello fro the cotroller");
    const page: IPage = {
        skip: Number(req.query.skip) || 0,
        take: Number(req.query.take) || 5,
    };
    const data = await bookServices.getBooks(page);
    console.log(data);
    res.json(data);
};

//get book by ID
export const getBookById = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    const data = await bookServices.getBookById(bookId);
    res.json({ data });
};

//search book handler
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

//upload book handler
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

//update book handler
export const updateBookHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const bookInfo: string = req.params.id;
    const data = await bookServices.updateBookHandler(bookInfo);
    res.json({ msg: "hello from the update book controller", data });
};

//delete book handler
export const deleteBookHandler = async (req: IAuthRequest, res: Response) => {
    console.log(req.user, "user id from controller");
    const userId = req.user;
    const bookInfo: IBookInfo = {
        userId: Number(userId),
        bookId: Number(req.params.id),
    };
    const data = await bookServices.deleteBookHandler(bookInfo);
    return res.json(data);
};

//download pdf handler
export const downloadBookHandler = async (req: Request, res: Response) => {
    const bookInfo = Number(req.params.id);
    const data = await bookServices.downloadBookHandler(bookInfo);
    console.log(bookInfo, "download book ");
    // return res.json(data);
    if ("error" in data) {
        return res.status(404).json({ error: data.error });
    }
    res.setHeader("content-type", "application/pdf");
    res.setHeader("Content-disposition", "attachment; filename=book.pdf");
    return data.pipe(res);
};

//get image handler
export const getImageHandler = async (req: Request, res: Response) => {
    const bookInfo = Number(req.params.bookId);
    const data = await bookServices.getImageHandler(bookInfo);
    if ("error" in data) {
        return res.status(404).json({ error: data.error });
    }
    res.set("Content-Type", "image/jpeg");
    return data.pipe(res);
};


export const getBookByUser = async(req: IAuthRequest, res: Response)=>{
    const userId = Number(req.user);
    console.log(userId);
    const data = await bookServices.getBookByUser(userId);
    // if(data){
    //     return res.status(400).json({error: data});
    // }
    return res.status(200).json(data);
};


