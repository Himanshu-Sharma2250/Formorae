import { Request, Response } from "express"
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { User } from "../models/auth/index.js";

import { loginUserSchema, registerUserSchema } from "../validators/auth.validator.js"
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
    const {data, error} = registerUserSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse : ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse of zod"
        })
    }

    const {name, email, password} = data;

    try {
        // find if the user already exist or not 
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;

        await user.save();

        sendEmail({
            email: user?.email,
            subject: "",
            mailgenContent: emailVerificationMailgenContent(
                user.name,
                `${process.env.BASE_URL}/api/v1/auth/verify-email/${unHashedToken}`
            )
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        )

        if (!createdUser) {
            return res.status(404).json({
                success: false,
                message: "User not registered"
            })
        }

        res.status(201).json({
            success: true,
            message: "User registered",
            user
        })
    } catch (error) {
        console.error("Error registering user: ", error);
        res.status(500).json({
            success: false,
            message: "Error registering User"
        })   
    }
}

export const verifyEmail = async function(req: Request, res: Response) {
    // get the unhashed token from the user's params
    // check if the hashed token we stored is the same after hashing the token
    const {unHashedToken} = req.params;

    try {
        // convert the unhashed token in hashed token
        const hashedToken = crypto
            .createHash("sha256")
            .update(unHashedToken)
            .digest("hex");

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: {
                $gt: Date.now()
            }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification token"
            })
        }

        user.emailVerificationToken = undefined;
        user.emailVerificationExpiry = undefined;
        user.isVerified = true;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User's email verified",
            user
        })
    } catch (error) {
        console.error("Error in verifying the User's email: ", error);
        res.status(500).json({
            success: false,
            message: "Error in Verifying the User's email"
        })
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {data, error} = loginUserSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse of zod"
        })
    }

    const {email, password} = data;

    try {
        // get the user using email and check if the user is present
        // then compare the passwords with hashed password stored in the db
        // if true then create a token using jwt which will be store in the cookie
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or Password is Incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Email or Password is Incorrect"
            })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        const loggedUser = await User.findById(user._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
        );

        interface optionType {
            httpOnly: boolean
            maxAge: number
            secure: boolean
        }

        const cookieOption: optionType = {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === "production"
        }

        res.status(200)
            .cookie("AccessToken", accessToken, cookieOption)
            .cookie("RefreshToken", refreshToken, cookieOption)
            .json({
                success: true,
                message: "User logged in successfully", 
                user
            })
    } catch (error) {
        console.error("Error in loginUser: ", error);
        res.status(500).json({
            success: false,
            message: "Error in Login User"
        })
    }
};

