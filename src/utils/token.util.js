import jwt from "jsonwebtoken";
import env from "../config/env.js";


export const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        env.JWT_ACCESS_SECRET,
        {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN,
            algorithm: "HS256",
        }
    );
};


export const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET,
        {
            expiresIn: env.JWT_REFRESH_EXPIRES_IN,
            algorithm: "HS256",
        }
    );
};


export const verifyAccessToken = (token) => {
    if (!token || typeof token !== "string") {
        throw new Error("Access token is required");
    }

    return jwt.verify(
        token,
        env.JWT_ACCESS_SECRET,
        {
            algorithms: ["HS256"],
        }
    );
};


export const verifyRefreshToken = (token) => {
    if (!token || typeof token !== "string") {
        throw new Error("Refresh token is required");
    }

    return jwt.verify(
        token,
        env.JWT_REFRESH_SECRET,
        {
            algorithms: ["HS256"],
        }
    );
};

