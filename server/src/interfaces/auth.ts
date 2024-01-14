import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IRegister {
    userName: string,
    email: string,
    password: string
}

export interface ILogin {
    email: string,
    password: string
}

export interface IAuthRequest extends Request {
    user?: JwtPayload,
}

export interface IUserInfo {
    userInfo: JwtPayload
}

export interface IUpdatePassword{
    oldPassword: string,
    newPassword: string
}