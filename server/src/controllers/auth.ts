import { Request, Response } from "express";
import * as authService from "../services/auth";
import { IAuthRequest, ILogin, IRegister } from "../interfaces/auth";

// register controller
export const registerHandler = async (req: Request, res: Response) => {
    // console.log("req.body");
    const userInfo: IRegister = req.body;
    const data = await authService.registerHandler(userInfo);
    // console.log(data);
    if (data.err) {
        return res.status(400).json({ error: data.err });
    }
    return res.status(201).json(data);
};

//login controller
export const loginHandler = async (req: Request, res: Response) => {
    // console.log(req.body);
    const userInfo: ILogin = req.body;
    const data = await authService.loginHandler(userInfo);
    // console.log(data);
    if ("error" in data) {
        return res.status(400).json(data);
    }
    res.cookie("accessToken", data.accessToken, { httpOnly: true });
    res.cookie("refreshToken", data.refreshToken, { httpOnly: true });
    return res.status(200).json(data);
};

// logout handler
export const logoutHandler = async (req: Request, res: Response) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.json({ msg: "logged out successful" });
};

//user info handler
export const getUserInfo = async (req: Request, res: Response) => {
    const token: string = req.cookies.accessToken;
    const data = await authService.getUserInfo(token);
    // console.log(data);
    if (!data) {
        return res.status(400).json({ error: "can't get user info" });
    }
    return res.status(200).json(data);
};


//change password handler
export const changePasswordHandler = async (req: IAuthRequest, res: Response) => {
    const userId = Number(req.user);
    const updatePassword = req.body;
    // console.log("userId:", userId, "updatePassword:", updatePassword); 
    try {
        const data = await authService.changePasswordHandler(userId, updatePassword);
        if (data?.error) {
            return res.status(400).json(data);
        }
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error while changing password" });
    }
};

