import "dotenv/config";

const requiredEnv = [
    "NODE_ENV",
    "PORT",
    "MONGO_URI",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES_IN",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES_IN",
];

const missingEnv = requiredEnv.filter(
    (key) => !process.env[key]?.trim()
);

if (missingEnv.length > 0) {
    console.error(
        `Missing required environment variables:\n- ${missingEnv.join("\n- ")}`
    );

    process.exit(1);
}

const PORT = Number(process.env.PORT);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error("PORT must be a valid number between 1 and 65535");
    process.exit(1);
}


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET.trim();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET.trim();

if (JWT_ACCESS_SECRET.length < 32) {
    console.error(
        "JWT_ACCESS_SECRET must be at least 32 characters long"
    );

    process.exit(1);
}

if (JWT_REFRESH_SECRET.length < 32) {
    console.error(
        "JWT_REFRESH_SECRET must be at least 32 characters long"
    );

    process.exit(1);
}

const env = Object.freeze({
    NODE_ENV: process.env.NODE_ENV.trim(),

    PORT,

    MONGO_URI: process.env.MONGO_URI.trim(),

    JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN.trim(),

    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN.trim(),
});

export default env;