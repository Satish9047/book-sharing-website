import axios, { AxiosError, AxiosResponse } from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

//interceptor for handling 401 error
HTTP.interceptors.response.use(
    (response: AxiosResponse) => {
        //if success 
        return response;
    },
    async (error: AxiosError) => {
        //if error
        if((error as AxiosError).response?.status === 401){
            try {
                console.log(error.response?.data);
                const res = await axios.post("http://localhost:8080/refresh", {
                    withCredentials: true,
                });
                console.log(res.status);
                if(res.status === 200){
                    return HTTP(error.config as unknown as string);
                }
            } catch (error) {
                console.log(error);
                window.location.replace("/src/view/login/login.html");
            } 
        }
        return Promise.reject(error);        
    }
);


export default HTTP;