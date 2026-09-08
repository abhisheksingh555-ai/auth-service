import { verifyAccessToken } from "../utils/token.util.js";

export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const error = new Error("Access token required");
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            const error = new Error("Access token required");
            error.statusCode = 401;
            throw error;
        }

        const decoded = verifyAccessToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};