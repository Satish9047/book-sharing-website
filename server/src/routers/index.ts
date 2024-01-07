import { Router } from "express";
import authRouter from "./auth";
import bookRouter from "./book";
import { jwtAuth } from "../middlewares/auth";
import jwtRefreshRouter from "./jwt";
//import userRouter from "./index";

const router = Router();

router.use("/auth", jwtAuth, authRouter);
router.use("/books", jwtAuth, bookRouter);
//router.use("/user", userRouter);
router.use("/refresh", jwtRefreshRouter);

export default router;
