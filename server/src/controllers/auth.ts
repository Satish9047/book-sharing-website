import { Request, Response } from "express";
import * as authService from "../services/auth";
import { ILogin, IRegister } from "../interfaces/auth";
// import defatultCookieOption from "../constants/expiry";

export const registerHandler = async (req: Request, res: Response) => {
    // console.log(req.headers);
    console.log("req.body");
    const userInfo: IRegister = req.body;
    const data = await authService.registerHandler(userInfo);
    console.log(data);
    if(data.err){
        return res.status(400).json({error: data.err});
    }
    return res.status(201).json(data);
};

export const loginHandler = async (req: Request, res: Response) => {
    const userInfo: ILogin = req.body;
    console.log(userInfo);
    const data = await authService.loginHandler(userInfo);
    console.log(data);
    if(data.err){
        return res.status(400).json({error: data.err});
    }
    res.cookie("accessToken", data.accessToken, { httpOnly: true });
    res.cookie("refreshToken", data.refreshToken, { httpOnly: true });
    return res.status(200).json(data);
};

export const logoutHandler = async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ msg: "logged out successful" });
};

