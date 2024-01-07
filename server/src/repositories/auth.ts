// import { PrismaClient } from "@prisma/client";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import { ILogin, IRegister } from "../interfaces/auth";

// const prisma = new PrismaClient();
// const saltRounds = 10;

export const registerHandler = async (userInfo: IRegister) => {
    console.log(userInfo);
    // const userExist = await prisma.user.findFirst({
    //     where: {
    //         email: userInfo.email
    //     }
    // });
    // if (userExist) {
    //     return "user already registered";
    // }



    // try {
    //     const newUser = await prisma.user.create({
    //         data: {
    //             userName: userInfo.userName,
    //             email: userInfo.email,
    //             password: hashPassword
    //         },
    //     });
    // } catch (error) {
    //     console.error(error);
    // }
    return "hello auth register from the repositories";
};

export const loginHandler = async (userInfo: ILogin) => {
    console.log(userInfo);
    return "hello auth login from the repositories";
};

