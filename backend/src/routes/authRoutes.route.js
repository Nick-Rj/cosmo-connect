import express from "express";
import { loginController, logoutController, signupController } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/signup", signupController);
authRouter.get("/login", loginController);
authRouter.get("/logout", logoutController);


export default authRouter;