import { Request, Response } from "express";
import * as bookServices from "../services/book";
import { IAddBook } from "../interfaces/book";


export const getBooks = async (req: Request, res: Response) => {
    const data = await bookServices.getBooks();
    console.log(data);
    res.json({ msg: "hello from the book controller", data });
};

export const addBookHandler = async (req: Request, res: Response) => {
    const bookInfo: IAddBook = req.body;
    const bookFile = req.files;
    // console.log(bookFile.);
    const data = await bookServices.addBookHandler(bookInfo);
    res.json({ msg: data });
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
    res.json({ msg: "hello from the delete book controller", data });
};


