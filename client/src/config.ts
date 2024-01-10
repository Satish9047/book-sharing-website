import axios from "axios";

const HTTP = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export default HTTP;