import express from "express";
// import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";


import config from "./config";
import router from "./routers";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
// app.use(
//     helmet({
//         crossOriginEmbedderPolicy: false,
//         contentSecurityPolicy: false,
//         crossOriginResourcePolicy: { policy: "same-origin" },

//     })
// );
app.use(morgan("combined"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

app.listen(config.SERVER_PORT, () => {
    console.log(`Server is running in port: ${config.SERVER_PORT}`);
});
