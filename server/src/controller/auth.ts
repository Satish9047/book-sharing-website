import {Request, Response} from "express";

export const registerHandler = (req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from Register"});
};

export const loginHandler = (req:Request, res:Response)=>{
    console.log(req.headers);
    res.json({msg: "hello from login"});
};

