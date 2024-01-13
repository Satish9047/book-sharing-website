import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../schema/auth";
import config from "../config";


//login middlware
export const loginAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: `${error.message}` });
    }
    next();
};

//register middleware
export const registerAuth = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).json({ error: `${error.message}` });
    }
    next();
};


//jwt token Validation
export const jwtAuth = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;
    //console.log(accessToken);

    if (!accessToken) {
        return res.status(401).json({ error: "Access Denied! 1" });
    }

    try {
        const verifyToken = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET) as JwtPayload;
        if (!verifyToken) {
            res.clearCookie("accessToken");
            console.log(verifyToken);
            return res.status(401).json({ error: "Access Denied! 2" });
        }
        req.user = verifyToken.id;
        next();
    } catch (error) {
        console.error("Error verifying access token:", error);
        res.clearCookie("accessToken");
        // res.clearCookie("refreshToken");
        return res.status(401).json({ error: "Access Denied! 3!!!!" });
    }
};





