import * as authRepositories from "../repositories/auth";
import { ILogin, IRegister, IUpdatePassword } from "../interfaces/auth";

//register service
export const registerHandler = async (userInfo: IRegister) => {
    const data = authRepositories.registerHandler(userInfo);
    return data;
};

//login service
export const loginHandler = async (userInfo: ILogin) => {
    const data = authRepositories.loginHandler(userInfo);
    return data;
};

//user info service
export const getUserInfo = async (userInfo: string)=>{
    const data = authRepositories.getUserInfo(userInfo);
    return data;
};

//change password service
export const changePasswordHandler = async (userId: number, updatePassword: IUpdatePassword)=>{
    const data = authRepositories.changePasswordHandler(userId, updatePassword);
    return data;
};