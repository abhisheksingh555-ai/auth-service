import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.route.js";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", authRouter);


app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is healthy",
    });
});

export default app;