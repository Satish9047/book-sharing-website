import { Router } from "express";
import * as authController from "../controllers/auth";
import { loginAuth, registerAuth } from "../middlewares/auth";

const authRouter = Router();

authRouter.get("/userInfo", authController.getUserInfo);
authRouter.post("/register", registerAuth, authController.registerHandler);
authRouter.post("/login", loginAuth, authController.loginHandler);
authRouter.get("/logout", authController.logoutHandler);
export default authRouter;

