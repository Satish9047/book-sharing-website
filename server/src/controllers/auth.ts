import {Request, Response} from "express";
import * as authService from "../services/auth";

export const registerHandler = async(req:Request, res:Response)=>{
    console.log(req.headers);
    const data = await authService.registerHandler();
    res.json({msg: "hello from Register", data});
};

export const loginHandler = async(req:Request, res:Response)=>{
    console.log(req.headers);
    const data = await authService.loginHandler();
    res.json({msg: "hello from login", data});
};

