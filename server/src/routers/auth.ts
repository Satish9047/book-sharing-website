
import { Router } from "express";
import * as authController from "../controllers/auth";
import { loginAuth, registerAuth, jwtAuth, chnagePasswordVerify } from "../middlewares/auth";

const authRouter = Router();

//auth routers
authRouter.get("/userInfo",jwtAuth, authController.getUserInfo);
authRouter.post("/register", registerAuth, authController.registerHandler);
authRouter.post("/login", loginAuth, authController.loginHandler);
authRouter.post("/changePassword",jwtAuth, chnagePasswordVerify, authController.changePasswordHandler);
authRouter.get("/logout", authController.logoutHandler);

export default authRouter;

