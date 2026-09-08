import User from "../models/auth.model.js";
import { 
    hashValue,
    compareHash
} from "../utils/hash.util.js";
import { 
    generateAccessToken,
} from "../utils/token.util.js";

export const registerUser = async ({
    firstName,
    lastName,
    email,
    phone,
    username,
    password,
}) => {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.toLowerCase().trim();

    const existingUser = await User.findOne({
        $or: [
            { email: normalizedEmail },
            { phone },
            { username: normalizedUsername },
        ],
    });

    if (existingUser) {
        if (existingUser.email === normalizedEmail) {
            throw new Error("Email already registered");
        }

        if (existingUser.phone === phone) {
            throw new Error("Phone already registered");
        }

        if (existingUser.username === normalizedUsername) {
            throw new Error("Username already taken");
        }
    }

    const passwordHash = await hashValue(password);

    const user = await User.create({
        firstName,
        lastName,
        email: normalizedEmail,
        phone,
        username: normalizedUsername,
        password: passwordHash,
        role: "user",
    });

    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
    };
};

export const loginUser = async ({
    email,
    password
}) => {
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ 
        email: normalizedEmail, 
    }).select("+password");

    if (!user) { 
        throw new Error("Invalid email or password"); 
    };

    const isPasswordValid = await compareHash( 
        user.password, password 
    );

    if (!isPasswordValid) { 
        throw new Error("Invalid email or password"); 
    }

    const accessToken = generateAccessToken({ 
        id: user._id.toString(), 
    }); 

    const safeUser = { 
        id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName, 
        email: user.email, 
        phone: user.phone, 
        username: user.username, 
        createdAt: user.createdAt, 
    };

    return { 
        user: safeUser, 
        accessToken, 
    };

}

export const getUserById = async (userId) => {
    const user = await User.findById(userId).select(
        "-password"
    );

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export const logoutUser = async () => {
    return {
        message: "Logged out successfully",
    };
};