import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../models/auth/index.js";

export const verifyJWT = async (req:Request, res: Response, next: NextFunction) => {
    // get the token from the cookie and then verify it 
    // get the user and the assign the user to req.user
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request"
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken -emailVerificationToken, -emailVerificationExpiry"
        );

        if (!user) {
            return res.status(400).json({
                success: true,
                message: "Invalid Access Token"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyJWT: ", error);
        res.status(500).json({
            success: false,
            message: "Invalid access token"
        })
    }
}