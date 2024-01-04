import {Request, Response} from "express";

export const getBooks =async(req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the book controller"});
};

export const addBookHandler = async(req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the add book controller"});
};

export const updateBookHandler = async(req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the update book controller"});
};

export const deleteBookHandler = async(req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from the delete book controller"});
};


