import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import config from "./config";
import router from "./routers";

const app = express();

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(morgan("combined"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// pass the request to router
app.use("/", router);

//server request listner 
app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running in port: ${config.SERVER_PORT}`);
});
