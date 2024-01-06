import { Request, Response } from "express";
import * as authService from "../services/auth";
import { ILogin, IRegister } from "../interfaces/auth";

export const registerHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const userInfo: IRegister = req.body;
    const data = await authService.registerHandler(userInfo);
    res.json({ msg: "hello from Register", data });
};

export const loginHandler = async (req: Request, res: Response) => {
    console.log(req.headers);
    const userInfo: ILogin = req.body;
    const data = await authService.loginHandler(userInfo);
    res.json({ msg: "hello from login", data });
};

