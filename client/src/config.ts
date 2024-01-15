import axios, { AxiosError, AxiosResponse } from "axios";


const HTTP = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

HTTP.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        //console.log(error);
    
        if((error as AxiosError).response?.status === 401){
            try {
                console.log(error.response?.data);
                const res = await axios.post("http://localhost:8080/refresh", {
                    withCredentials: true,
                });
                console.log(res.status);
                if(res.status === 200){
                    //window.location.reload();
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


// async function handle401Error(error: AxiosError) {
//     if (error.response?.status === 401) {
//         try {
//             const refreshTokenResponse: AxiosResponse = await HTTP.post("/refresh");

//             if (refreshTokenResponse.status === 200) {
//                 window.location.reload();
//                 console.log("hello form the refresh error", refreshTokenResponse);
//                 return;
//             } else {
//                 window.location.replace("/src/view/login/login.html");
//             }
//         } catch (refreshError) {
//             console.error("Error during token refresh:", refreshError);
//             window.location.replace("/src/view/login/login.html");
//         }
//     }
// }


export default HTTP;