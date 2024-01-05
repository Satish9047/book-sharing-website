import {Request, Response} from "express";
import * as bookServices from "../services/book";

export const getBooks = async (req: Request, res: Response) => {
    const data = await bookServices.getBooks();
    console.log(data);
    res.json({msg: "hello from the book controller", data});
};

export const addBookHandler = async (req: Request, res: Response) => {
    const data = await bookServices.addBookHandler();
    res.json({msg: "hello from the add book controller", data});
};

export const updateBookHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const data = await bookServices.updateBookHandler();
    res.json({msg: "hello from the update book controller"});
};

export const deleteBookHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const data = await bookServices.deleteBookHandler();
    res.json({msg: "hello from the delete book controller"});
};


