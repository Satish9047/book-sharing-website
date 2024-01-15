import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

//register
export interface IRegister {
    userName: string,
    email: string,
    password: string
}

//login
export interface ILogin {
    email: string,
    password: string
}

//request extended with user info
export interface IAuthRequest extends Request {
    user?: JwtPayload,
}

//user info
export interface IUserInfo {
    userInfo: JwtPayload
}

// password change
export interface IUpdatePassword{
    oldPassword: string,
    newPassword: string
}