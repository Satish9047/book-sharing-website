import * as authRepositories from "../repositories/auth";

export const registerHandler = async ()=>{
    const data = authRepositories.registerHandler();
    return data;
};

export const loginHandler = async ()=>{
    const data = authRepositories.loginHandler();
    return data;
};