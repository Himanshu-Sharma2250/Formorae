import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";

import { availableUserRoles, UserRolesEnum } from "../../constant.js";

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
        forgotPasswordExpiry: {
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
})

export const User = mongoose.model("User", userSchema);