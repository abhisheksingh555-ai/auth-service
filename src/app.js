import express from "express";
const app = express();
import authRouter from "./routes/auth.route.js";

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