import {Request, Response, NextFunction} from "express";
import {loginSchema, registerSchema} from "../schema.auth";

//login middlware
export const loginAuth = (req:Request, res:Response, next:NextFunction)=>{
    const {error} = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "Invalid Username or Password!"});
    }
    next();
};

//register middleware
export const registerAuth = (req:Request, res:Response, next:NextFunction)=>{
    const {error} = registerSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "invalid credentials provided"});
    }
    next()
};

//addbook middleware
export const addBookMiddlware = (req:Request, res:Response, next:NextFunction)=>{
    const {error} = addBookSchema.validate(req.body);
    if(error){
        return res.status(400).json({error: "invalid credentials provided"});
    }
    next()
};
