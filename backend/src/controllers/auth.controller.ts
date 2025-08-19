import { Request, Response } from "express"
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

import { User } from "../models/auth/index.js";

import { forgotPasswordSchema, loginUserSchema, registerUserSchema, resetPasswordSchema } from "../validators/auth.validator.js"
import { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail } from "../utils/mail.js";
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
            subject: "Verify Your Email",
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
    const {token} = req.params;

    try {
        // convert the unhashed token in hashed token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
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

        if (!loggedUser) {
            return res.status(400).json({
                success: false,
                message: "User not logged in"
            })
        }

        user.refreshToken = refreshToken;
        await user.save();

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

export const logoutUser = async (req:Request, res:Response) => {
    // just clear the tokens stored in the cookie
    try {
        await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    refreshToken: "",
                }
            }, 
            {new: true}
        )

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
            .clearCookie("AccessToken", cookieOption)
            .clearCookie("RefreshToken", cookieOption)
            .json({
                success: true,
                message: "User logged out successfully", 
            })
    } catch (error) {
        
    }
}

export const forgotPassword = async (req:Request, res:Response) => {
    // get the email from the user and get the user 
    // send the email to the user
    const {data, error} = forgotPasswordSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse of zod"
        })
    }

    const {email} = data;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Email"
            })
        }

        const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

        user.forgetPasswordToken = hashedToken;
        user.forgetPasswordExpiry = tokenExpiry;

        console.log("Hashed token stored in db : ", hashedToken);

        await user.save();

        sendEmail({
            email: user?.email,
            subject: "Reset Your Password",
            mailgenContent: forgotPasswordMailgenContent(
                user.name,
                `${process.env.BASE_URL}/api/v1/auth/reset-password/${unHashedToken}`
            )
        });

        res.status(200).json({
            success: true,
            message: "reset password email send"
        })
    } catch (error) {
        console.error("Error in forgot password: ", error);
        res.status(500).json({
            success: false,
            message: "Error in forgotPassword"
        })
    }
};

export const resetForgottenPassword = async (req: Request, res: Response) => {
    // get the token from the params
    // check if the token is correct or not
    // get the passwords from the user 
    const {token} = req.params;
    const {data, error} = resetPasswordSchema.safeParse(req.body);

    if (error) {
        console.error("Error in safeParse: ", error);
        return res.status(400).json({
            success: false,
            message: "Error in safeParse of zod"
        })
    }

    const {newPassword, confirmPassword} = data;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Confirm Password must be same a new Password"
        })
    }

    try {
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");
        
        console.log("hashed token in reset password : ", hashedToken);

        const user = await User.findOne({
            forgetPasswordToken: hashedToken,
            forgetPasswordExpiry: {
                $gt: Date.now()
            }
        });

        console.log("User : ", user)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            })
        }

        user.forgetPasswordToken = undefined;
        user.forgetPasswordExpiry = undefined;

        user.password = newPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User's Password resetted successfully",
            user
        })
    } catch (error) {
        console.error("Error in reseting password: ", error);
        res.status(500).json({
            success: false,
            message: "Error in reseting password"
        })
    }
}

export const getProfile = async (req: Request, res:Response) => {
    try {
        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please Login"
            })
        }

        res.status(200).json({
            success: true,
            message: "User's Profile",
            user
        })
    } catch (error) {
        console.error("Error getting User's Profile: ", error);
        res.status(500).json({
            success: false,
            message: "Error getting User's Profile"
        })
    }
}

export const resendEmailVerification = async (req:Request, res:Response) => {
    try {
        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User do not exist"
            })
        }

        if (user.isVerified) {
            return res.status(409).json({
                success: false,
                message: "User already verified"
            })
        }

        const {unHashedToken, hashedToken, tokenExpiry} = user.generateTemporaryToken();

        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;

        await user.save();

        sendEmail({
            email: user?.email,
            subject: "Verify Your Email",
            mailgenContent: emailVerificationMailgenContent(
                user.name,
                `${process.env.BASE_URL}/api/v1/auth/verify-email/${unHashedToken}`
            )
        });

        res.status(200).json({
            success: true,
            message: "Email send to your Id"
        })
    } catch (error) {
        console.error("Error re-sending email: ", error)
        res.status(500).json({
            success: false,
            message: "Error re-sending email"
        })
    }
}

interface JwtPayload {
    _id: string;
}

export const refreshAccessToken = async (req:Request, res:Response) => {
    const inCommingRefreshToken = req.cookies?.RefreshToken || req.body.RefreshToken;

    if (!inCommingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request"
        })
    }

    try {
        const decodedToken = jwt.verify(inCommingRefreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload;

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        // check if incoming refresh token is same as the refresh token attached in the user document
        // This shows that the refresh token is used or not
        // Once it is used, we are replacing it with new refresh token below
        if (user.refreshToken !== inCommingRefreshToken) {
            // token is valid but used
            return res.status(401).json({
                success: false,
                message: "Refresh token expired"
            })
        }

        const accessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save();

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

        res.cookie("AccessToken", accessToken, cookieOption)
        res.cookie("RefreshToken", newRefreshToken, cookieOption)

        res.status(200).json({
            success: true,
            message: "Access Token Refreshed",
            user
        })
    } catch (error) {
        console.error("Error refreshing access token: ", error);
        res.status(500).json({
            success: false,
            message: "Error refreshing access token"
        })
    }
}