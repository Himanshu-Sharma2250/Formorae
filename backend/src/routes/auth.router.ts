import { Router } from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetForgottenPassword, verifyEmail } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/login", loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetForgottenPassword);

export default authRouter;