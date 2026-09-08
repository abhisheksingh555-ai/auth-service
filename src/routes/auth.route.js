import express from "express";

import {
    register,
    login,
    getMe,
    logout,
} from "../controllers/auth.controller.js";

import {
    authenticate,
} from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get(
    "/me",
    authenticate,
    getMe
);

authRouter.post(
    "/logout",
    authenticate,
    logout
);

export default authRouter;