import { Router, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRY } from "../constants/expiry";
import config from "../config";

const jwtRefreshRouter = Router();

//refresh token provider
jwtRefreshRouter.post("/", (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    // verify refresh token
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
        const id = verifyToken.id;

        if (!email && !id) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            return res.status(401).json({ error: "Access Denied!" });
        }

        const accessToken = jwt.sign({ email: email, id: id }, config.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
        console.log("access token",accessToken);
        res.cookie("accessToken", accessToken);
        return res.status(200).json({ msg: "Token Refreshed" });
    } catch (error) {
        console.error("Error verifying refresh token:", error);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(400).json({ error: "Access Denied!" });
    }
});

export default jwtRefreshRouter;
