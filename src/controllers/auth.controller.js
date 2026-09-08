import {
    registerUser,
    loginUser,
    getUserById,
    logoutUser
} from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await loginUser({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await getUserById(req.user.id);

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const result = await logoutUser();

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};
