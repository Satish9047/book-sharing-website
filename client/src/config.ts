import axios, { AxiosResponse } from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

HTTP.interceptors.response.use((response:AxiosResponse)=>{
    //return successfull response
    return response;
}, 
async (error)=>{
    console.log(error);
});

export default HTTP;