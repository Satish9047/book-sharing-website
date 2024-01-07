import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../schema/auth";
import config from "../config";


//login middlware
export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "Invalid Username or Password!" });
    }
    next();
};

//register middleware
export const registerAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: "invalid credentials provided" });
    }
    next();
};


//jwt token Validation
export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);

    if (!accessToken) {
        return res.status(401).json({ error: "Access Denied!" });
    }

    try {
        const verifyToken = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);
        if (!verifyToken) {
            res.clearCookie("accessToken");
            return res.status(401).json({ error: "Access Denied!" });
        }
        next();
    } catch (error) {
        // Handle token verification errors
        console.error("Error verifying access token:", error);
        res.clearCookie("accessToken");
        return res.status(401).json({ error: "Access Denied!" });
    }
};





