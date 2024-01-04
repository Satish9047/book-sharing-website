import {Router} from "express";
import * as authController from "../controller/auth";

const authRouter = Router();

authRouter.post("/register", authController.registerHandler);
authRouter.post("/login", authController.loginHandler);
export default authRouter;

