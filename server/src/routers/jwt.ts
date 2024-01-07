import { Router, Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY } from "../constants/expiry";
import config from "../config";

const jwtRefreshRouter = Router();

jwtRefreshRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).json({ error: "Access Denied! 1" });
    }

    try {
        const verifyToken = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET) as JwtPayload;
        if (!verifyToken) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({ error: "Access Denied! 2" });
        }
        const email = verifyToken.email;

        if (!email) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({ error: "Access Denied! 3" });
        }

        const accessToken = jwt.sign({ email }, config.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        res.cookie("accessToken", accessToken);
        res.status(200).json({ msg: "Token Refreshed" });
        next();
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).json({ error: "Access Denied! 4" });
    }
});

export default jwtRefreshRouter;