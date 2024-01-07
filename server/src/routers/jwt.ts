import { Router, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY } from "../constants/expiry";
import config from "../config";

const jwtRefreshRouter = Router();

jwtRefreshRouter.get("/refresh", (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.clearCookie("accessToken");
        return res.status(401).json({ error: "Access Denied!" });
    }

    try {
        const verifyToken = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);
        if (!verifyToken) {
            res.clearCookie("accessToken");
            return res.status(401).json({ error: "Access Denied!" });
        }
        const email = refreshToken.email;

        if (!email) {
            res.clearCookie("accessToken");
            return res.status(401).json({ error: "Access Denied!" });
        }

        const accessToken = jwt.sign({ email }, config.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        res.cookie("accessToken", accessToken);
        res.status(200).json({ msg: "Token Refreshed" });
        next();
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        res.clearCookie("accessToken");
        return res.status(401).json({ error: "Access Denied!" });
    }
});

export default jwtRefreshRouter;
