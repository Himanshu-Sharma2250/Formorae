import { Router } from "express";
import { forgotPassword, getProfile, loginUser, logoutUser, refreshAccessToken, registerUser, resendEmailVerification, resetForgottenPassword, verifyEmail } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/login", loginUser);
authRouter.get("/profile", verifyJWT, getProfile);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetForgottenPassword);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/resend-email-verification", verifyJWT, resendEmailVerification);

export default authRouter;