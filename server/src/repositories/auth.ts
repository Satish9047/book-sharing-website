import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ILogin, IRegister } from "../interfaces/auth";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants/expiry";
import config from "../config";

//constants
const saltRounds = 10;
const prisma = new PrismaClient();
const ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = config.REFRESH_TOKEN_SECRET;

//register handler
export const registerHandler = async (userInfo: IRegister) => {
    //verify user exist
    const userExist = await prisma.user.findFirst({ where: { email: userInfo.email } });
    if (userExist) return { err: "user already existed" };
    
    try {
        //password hashing
        const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);
        if(!hashedPassword) return {error: "invalid credentials"};

        //saving user into database
        const newUser = await prisma.user.create({
            data: {
                user_name: userInfo.userName,
                email: userInfo.email,
                password: hashedPassword
            }
        });
        console.log(newUser);
        return { msg: "User created"};
    } catch (error) {
        console.error("Error during registration:", error);
        return { error: "error during registration" };
    }
};


//login handler
export const loginHandler = async (userInfo: ILogin) => {
    //verify user
    const userExists = await prisma.user.findFirst({ where: { email: userInfo.email } });
    if (!userExists) return { error: "user does not exist" };
    try {
        //verify user's password
        const passwordMatch = await bcrypt.compare(userInfo.password, userExists.password);
        if (!passwordMatch) return { error: "password does not match" };

        //generating token
        const accessToken = jwt.sign({ email: userExists.email, id: userExists.user_id }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign({ email: userExists.email, id: userExists.user_id }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
        return { msg: "login success", accessToken: accessToken, refreshToken: refreshToken };

    } catch (error) {
        console.log("error while logining in : ", error);
        return { error: "server error while logging" };
    }
};

//get user info
export const getUserInfo = async (userInfo: string) => {
    try {
        //verify token
        const verifyToken = jwt.verify(userInfo, ACCESS_TOKEN_SECRET) as JwtPayload;
        if(!verifyToken) return { error: "invalid user" };
        const userId = verifyToken.id;

        //get user info
        const user = await prisma.user.findFirst({
            where: { user_id: userId },
            select: {
                user_id: true,
                user_name: true,
                email: true
            }
        });
        return user;
    } catch (error) {
        console.log("error while getting user info: ",error);
        return { error: "error while geting user info" };
    }
};

