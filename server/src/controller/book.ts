import {Request, Response} from "express";

export const getBooks =(req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the book controller"});
};

export const addBookHandler = (req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the add book controller"});
};

export const updateBookHandler = (req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the update book controller"});
};

export const deleteBookHandler = (req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the delete book controller"});
};


