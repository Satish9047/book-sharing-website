import {Router} from "express";
import authRouter from "./auth";
import bookRouter from "./book";
//import userRouter from "./index";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", bookRouter);
//router.use("/user", userRouter);

export default router;
