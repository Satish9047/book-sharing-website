import {Router} from "express";
import authRouter from "./auth";
//import userRouter from "./index";
import bookRouter from "./book";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", bookRouter);
//router.use("/user", userRouter);

export default router;
