// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import { ILogin, IRegister } from "../interfaces/auth";

export const registerHandler = async (userInfo: IRegister) => {
    console.log(userInfo);
    return "hello auth register from the repositories";
};

export const loginHandler = async (userInfo: ILogin) => {
    console.log(userInfo);
    return "hello auth login from the repositories";
};

