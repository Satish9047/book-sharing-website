import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

import { ILogin, IRegister } from "../interfaces/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants  /expiry";
import config from "../config";

const saltRounds = 10;
const prisma = new PrismaClient();
const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;


//register handler
export const registerHandler = async (userInfo: IRegister) => {

    //getting user email
    const userExist = await prisma.user.findFirst({ where: { email: userInfo.email } });
    if (userExist) {
        return { err: "user already existed" };
    }
    try {
        const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
        const newUser = await prisma.user.create({
            data: {
                username: userInfo.userName,
                email: userInfo.email,
                password: hashedPassword
            }
        });
        return { msg: "User created", newUser };
    } catch (error) {
        console.error("Error during registration:", error);
        return { err: "error during registration" };
    }
};


//login handler
export const loginHandler = async (userInfo: ILogin) => {
    console.log(userInfo);

    const userExists = await prisma.user.findFirst({ where: { email: userInfo.email } });
    if (!userExists) {
        return { err: "user does not exist" };
    }

    try {
        const passwordMatch = await bcrypt.compare(userInfo.password, userExists.password);
        if (!passwordMatch) {
            return { err: "password does not match" };
        }

        const accessToken = jwt.sign({ email: userExists.email }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign({ email: userExists.email }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
        return { msg: "login success", accessToken: accessToken, refreshToken: refreshToken };

    } catch (error) {
        console.log("error while logining in : ", error);
        return { err: "error" };
    }
};

