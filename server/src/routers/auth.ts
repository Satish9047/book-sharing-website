import {Router} from "express";
import * as authController from "../controllers/auth";
import {loginAuth, registerAuth} from "../middlewares/auth";

const authRouter = Router();

authRouter.post("/register",registerAuth, authController.registerHandler);
authRouter.post("/login",loginAuth, authController.loginHandler);
export default authRouter;

