import mongoose, {Schema, Document} from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken"

import { availableUserRoles, USER_TEMPORARY_TOKEN_EXPIRY, UserRolesEnum } from "../../constant.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: availableUserRoles,
            default: UserRolesEnum.USER,
            required: true
        },
        refreshToken: {
            type: String,
        },
        forgetPasswordToken: {
            type: String,
        },
        forgetPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        }
    }, 
    {timestamps: true}
);

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

interface IUserDocument extends Document {
    name: string,
    email: string,
    password: string,
    isVerified: boolean,
    role: string,
    refreshToken: string,
    forgetPasswordToken: string | undefined
    forgetPasswordExpiry: number | undefined
    emailVerificationToken: string | undefined,
    emailVerificationExpiry: number | undefined,

    generateTemporaryToken(): {
        unHashedToken: string
        hashedToken: string 
        tokenExpiry: number
    }

    generateAccessToken(): any

    generateRefreshToken(): any
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: 1000 * 60 * 60 }
    );
};

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: 1000 * 60 * 60 * 24 }
  );
};

userSchema.methods.generateTemporaryToken = function () {
    // This token should be client facing
    // for example: for email verification unHashedToken should go into the user's mail
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    // This should stay in the DB to compare at the time of verification
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    // This is the expiry time for the token (20 minutes)
    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model<IUserDocument>("User", userSchema);