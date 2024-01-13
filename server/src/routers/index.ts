import { Router } from "express";
import authRouter from "./auth";
import bookRouter from "./book";
import { jwtAuth } from "../middlewares/auth";
import jwtRefreshRouter from "./jwt";

const router = Router();

// main routes
router.use("/auth", authRouter);
router.use("/books", jwtAuth, bookRouter);
router.use("/refresh", jwtRefreshRouter);

export default router;
