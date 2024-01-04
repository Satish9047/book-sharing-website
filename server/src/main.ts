import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import config from "./config";
import router from "./router";

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.listen(config.serverPort, ()=>{
    console.log(`Server is running in port: ${config.serverPort}`);
});
