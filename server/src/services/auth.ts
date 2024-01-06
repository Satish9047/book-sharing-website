import * as authRepositories from "../repositories/auth";
import { ILogin, IRegister } from "../interfaces/auth";

export const registerHandler = async (userInfo: IRegister) => {
    const data = authRepositories.registerHandler(userInfo);
    return data;
};

export const loginHandler = async (userInfo: ILogin) => {
    const data = authRepositories.loginHandler(userInfo);
    return data;
};